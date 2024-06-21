pipeline {
    agent {
        label 'dockerbuilder'
    }
    triggers {
        githubPush()
    }
    environment {
        REGISTRY_FEATURE = 'rgeorgegrid/3d-asset-management-frontend_feature'
        DOCKER_IMAGE_NAME = '3d-asset-management-frontend'
        DOCKER_REPO = 'feature'
        DOCKER_REPO_MAIN = 'main'
        DOCKERHUB_CREDS = credentials('dockerhub_creds')
        EC2_USER = 'ubuntu'
        EC2_HOST = '34.231.249.97'
        SSH_KEY = 'ec2_ssh_key'
    }
    stages {
        stage ('Install Packages') {
            steps {
                script {
                    echo 'INSTALLING PACKAGES...'
                    sh 'npm install'
                }
            }
        }
        stage('Build Docker Image for Feature Repository') {
            when {
                branch 'feature'
            }
            steps {
                script {
                    app = docker.build("${REGISTRY_FEATURE}:${env.BUILD_NUMBER}")
                }
            }
        }        
        stage('Push Docker Image to Feature Repository') {
            when {
                branch 'feature'
            }
            steps {
                script {
                    docker.withRegistry('', 'dockerhub_creds') {                     
                        app.push("latest")  
                        app.push("${env.BUILD_NUMBER}")      
                    }
                }
            }
        }
        stage('Cleanup Feature Docker Images') {
            when {
                branch 'feature'
            }
            steps {
                script {
                    echo 'CLEANING UP DOCKER IMAGES...'
                    sh "docker rmi ${REGISTRY_FEATURE}:${env.BUILD_NUMBER}"
                    sh "docker rmi ${REGISTRY_FEATURE}:latest"
                }
            }
        }
        stage('Build Docker Image for Main Repository') {
            when {
                branch 'main'
            }
            steps {
                script {
                    app = docker.build("${REGISTRY_MAIN}:${env.BUILD_NUMBER}")
                }
            }
        }        
        stage('Pull and Run Docker Image on EC2') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo 'DEPLOYING TO EC2...'
                    sshagent (credentials: ['ec2_ssh_key']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                                'docker login -u ${env.DOCKERHUB_CREDS_USR} -p ${env.DOCKERHUB_CREDS_PSW} && \\
                                 docker pull ${REGISTRY_MAIN}:latest && \\
                                 docker stop ${DOCKER_IMAGE_NAME} || true && \\
                                 docker rm ${DOCKER_IMAGE_NAME} || true && \\
                                 docker run -d --name ${DOCKER_IMAGE_NAME} -p 80:80 ${REGISTRY_MAIN}:latest'
                        """
                    }
                }
            }
        }
    }
}
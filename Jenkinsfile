pipeline {
    agent {
        label 'dockerbuilder'
    }
    triggers {
        githubPush()
    }
    environment {
        REGISTRY_FEATURE = 'rgeorgegrid/3d-asset-management-frontend_feature'
        DOCKER_IMAGE_NAME = '3d-asset-management-frontend-app'
        DOCKER_REPO = 'feature'
        DOCKER_REPO_MAIN = 'main'
        DOCKERHUB_CREDS = credentials('dockerhub_creds')
        EC2_USER = 'ubuntu'
        EC2_HOST = '34.231.249.97'
        SSH_KEY = 'ec2_ssh_key'
    }
    stages {
        stage ('Install Dependencies') {
            when {
                branch 'feature'
            }
            steps {
                script {
                    echo 'INSTALLING PACKAGES...'
                    sh 'npm install'
                }
            }
        }
        stage('Image Build with Docker Compose') {
            when {
                branch 'feature'
            }
            steps {
                script {
                    echo 'BUILDING IMAGE WITH DOCKER COMPOSE...'
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
        }        
        stage('Push to Feature Repo') {
            when {
                branch 'feature'
            }
            steps {
                script {
                    docker.withRegistry('', 'dockerhub_creds') {                     
                        sh "docker tag ${DOCKER_IMAGE_NAME} ${REGISTRY_FEATURE}:${env.BUILD_NUMBER}"
                        sh "docker push ${REGISTRY_FEATURE}:${env.BUILD_NUMBER}"
                        sh "docker tag ${DOCKER_IMAGE_NAME} ${REGISTRY_FEATURE}:latest"
                        sh "docker push ${REGISTRY_FEATURE}:latest"
                    }
                }
            }
        }
        stage('Clear Docker Cache') {
            when {
                branch 'feature'
            }
            steps {
                script {
                    echo 'CLEANING UP DOCKER IMAGES...'
                    sh "docker system prune -af"
                }
            }
        }      
        stage('Pull and Run Image on Test-Server') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo 'DEPLOYING TO EC2...'
                    sshagent (credentials: ['ec2_ssh_key']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} \\
                                'sudo usermod -aG docker ubuntu && \\
                                 docker login -u ${env.DOCKERHUB_CREDS_USR} -p ${env.DOCKERHUB_CREDS_PSW} && \\
                                 docker pull ${REGISTRY_FEATURE}:latest && \\
                                 docker stop ${DOCKER_IMAGE_NAME} || true && \\
                                 docker rm ${DOCKER_IMAGE_NAME} || true && \\
                                 docker run -d --name ${DOCKER_IMAGE_NAME} -p 3000:3000 --restart unless-stopped ${REGISTRY_FEATURE}:latest' || true && \\
                                 docker system prune -af
                        """
                    }
                }
            }
        }
    }
}

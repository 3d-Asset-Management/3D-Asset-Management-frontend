pipeline {
    agent {
        label 'dockerbuilder'
    }
    triggers {
        githubPush()
    }
    environment {
        REGISTRY_FEATURE = 'rgeorgegrid/3d-asset-management-frontend_feature'
        REGISTRY_MAIN = 'rgeorgegrid/3d-asset-management-frontend_main'
        DOCKER_IMAGE_NAME = '3d-asset-management-frontend'
        DOCKER_REPO = 'feature'
        DOCKER_REPO_MAIN = 'main'
        DOCKERHUB_CREDS = credentials('dockerhub_creds')
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
        stage('Build Docker Image for feature Repository') {
            when {
                branch 'feature'
            }
            steps {
                script {
                    app = docker.build("${REGISTRY_FEATURE}:${env.BUILD_NUMBER}")
                }
            }
        }        
        stage('Push Docker Image to feature Repository') {
            when {
                branch 'feature'
            }
            steps {
                script {
                    docker.withRegistry('', 'dockerhub_creds') {                     
                        app.push("latest")        
                    }
                }
            }
        }
        stage('Build Docker Image for Main Branch') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo 'RUNNING IN MAIN...'
                    def GIT_COMMIT_SHORT = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    env.DOCKER_TAG_MAIN = "${DOCKER_IMAGE_NAME}_${DOCKER_REPO_MAIN}:${GIT_COMMIT_SHORT}"
                    sh "docker build -t ${DOCKER_TAG_MAIN} ."
                }
            }
        }        
        stage('Push Docker Image to Main Repository') {
            when {
                branch 'main'
            }
            steps {
                echo 'RUNNING IN MAIN...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub_creds', passwordVariable: 'DOCKERHUB_CREDS_PSW', usernameVariable: 'DOCKERHUB_CREDS_USR')]) {
                    script {
                        sh "docker login -u ${DOCKERHUB_CREDS_USR} -p ${DOCKERHUB_CREDS_PSW}"
                        sh "docker image push ${DOCKER_TAG_MAIN}"
                    }
                }
            }
        }
    }
}
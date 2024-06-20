pipeline {
    agent {
        label 'dockerbuilder'
    }
    triggers {
        githubPush()
    }
    environment {
        DOCKER_IMAGE_NAME = '3D-Asset-Management-frontend'
        DOCKER_REPO = 'feature'
        DOCKER_REPO_MAIN = 'main'

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
                    def GIT_COMMIT_SHORT = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    env.DOCKER_TAG = "${DOCKER_IMAGE_NAME}/${DOCKER_REPO}:${GIT_COMMIT_SHORT}"
                    sh "docker build -t ${DOCKER_TAG} ."
                }
            }
        }        
        stage('Push Docker Image to feature Repository') {
            when {
                branch 'feature'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_hub_login', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    script {
                        sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                        sh "docker image push ${DOCKER_TAG}"
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
                    env.DOCKER_TAG_MAIN = "${DOCKER_IMAGE_NAME}/${DOCKER_REPO_MAIN}:${GIT_COMMIT_SHORT}"
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
                withCredentials([usernamePassword(credentialsId: 'docker_hub_login', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    script {
                        sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                        sh "docker image push ${DOCKER_TAG_MAIN}"
                    }
                }
            }
        }
    }
}
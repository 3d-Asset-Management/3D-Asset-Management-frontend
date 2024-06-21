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
                    }
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
        stage('Push Docker Image to Main Repository') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry('', 'dockerhub_creds') {                     
                        app.push("latest")        
                    }
                }
            }
        }
    }
}
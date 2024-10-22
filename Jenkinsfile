pipeline {

    environment {
        registry = "zoom_f_a"
        acPort = 1337
        dockerImage = ''
        }

    agent {
    node {
     label 'zoom_release'
     }
    }

    stages {
            stage('Delete old container') {
                        steps {
                            script {
                             try {
                           sh("java --version")
                           sh("docker stop zoom_f_a")
                           sh("docker rm zoom_f_a")
                           sh("docker rmi zoom_f_a")
                                        } catch (err) {
                                            echo err.getMessage()
                                        }
                            }
                         }
                    }
            stage('Build docker image') {
                 steps {
                     script {
                        sh("docker build -t  zoom_f_a .")
                     }
                  }
             }
            stage('Run docker container') {
                 steps {
                     script {
                        sh("docker run -td --restart unless-stopped --name zoom_f_a -p 3000:3000 zoom_f_a")
                     }
                  }
             }
        }
}
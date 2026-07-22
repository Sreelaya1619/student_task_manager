pipeline {
    agent {
        label 'agent1'
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Verify Ansible') {
            steps {
                sh 'ansible --version'
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                sh 'ansible-playbook -i ansible/inventory.ini ansible/test.yml'
            }
        }
    }

    post {
        success {
            echo 'Jenkins + Ansible execution successful!'
        }

        failure {
            echo 'Jenkins + Ansible execution failed!'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}

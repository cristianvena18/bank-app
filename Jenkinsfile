pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
               	sh 'npm run install'
		sh 'npm run tsc'
		echo 'Hola build'
            }
        }
        stage('Test') { 
            steps {
                sh 'npm run test'
		echo 'Hola test'
            }
        }
        stage('Deploy') { 
            steps {
                // pm2 start dist/server.js --name backend
		echo 'Hola deploy'
            }
        }
    }
}

pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
               	bash 'npm run install'
		bash 'npm run tsc'
		echo 'Hola build'
            }
        }
        stage('Test') { 
            steps {
                bash 'npm run test'
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

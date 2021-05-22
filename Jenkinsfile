pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
                sh npm run install
		sh npm run tsc
            }
        }
        stage('Test') { 
            steps {
                sh npm run test
            }
        }
        stage('Deploy') { 
            steps {
                sh pm2 start dist/server.js --name backend
            }
        }
    }
}

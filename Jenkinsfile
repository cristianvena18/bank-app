pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
//		sh 'cd server'
               	sh 'cd server && npm install'
		sh 'cd server && yarn tsc'
		echo 'Hola build'
            }
        }
        stage('Test') { 
            steps {
//                sh 'npm run test'
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

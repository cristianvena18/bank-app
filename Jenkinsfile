pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
		sh 'cd server'
               	sh 'npm install'
		sh 'yarn tsc'
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

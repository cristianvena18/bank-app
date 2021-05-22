pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
               	npm run install
		npm run tsc
            }
        }
        stage('Test') { 
            steps {
                npm run test
            }
        }
        stage('Deploy') { 
            steps {
                # pm2 start dist/server.js --name backend
            }
        }
    }
}

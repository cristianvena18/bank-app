/* This will load app which contains our main structure and logic */
import "reflect-metadata";
import App from "./App";
import express, { Application } from "express";
import apm from 'elastic-apm-node'

class Server {
  private express: Application;
  private app: App;

  constructor() {
    if (process.env.NODE_ENV === 'production') {
      apm.start({
        serviceName: 'Server',
        serverUrl: "http://elastic:changeme@apm-server:8200",
      })
    }
    
    this.express = express();
    this.app = new App();
    this.app.upServer(this.express);

    const PORT = process.env.PORT || 3002;
    this.up(Number(PORT));
  }

  private up(port: number) {
    /*
        Start Express Project on a specific PORT
        # If you don't put "no-console" : false in tslint.json
        # TSLint will prevent this line and throw an error.
        */
    this.express.listen(port, () => {
      console.log("Express Application listening on port " + port);
    });
  }
}

export default new Server();

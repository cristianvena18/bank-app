import { injectable } from "inversify";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import PublicRoutes from "./Presentation/Http/Routes";
import DatabaseConnection from "./Infrastructure/Persistence/DatabaseConnection";
import * as errorHandler from "./Infrastructure/Debug/ErrorHandler";
import container from "./Infrastructure/DI";
import { VerificateDomainMiddleware } from "./Presentation/Http/Middlewares/VerificateDomainMiddleware";
import { LoggerService } from "./Domain/Interfaces/Services/LoggerService";
import json from 'morgan-json'

@injectable()
export default class App {
  private app: Application;
  private router: PublicRoutes;
  private logger: LoggerService;

  public async upServer(express: Application) {
    this.app = express;
    /**
     * Load environment variables from .env file, where API keys and passwords are configured.
     */
    const result = dotenv.config();

    if (result.error) {
      throw new Error(`Environment variables not configured, aborting`);
    }
    this.logger = container.get('logger');
    await App.createDatabaseConnection();

    this.setMiddlewares();
    this.setRoutes();
    this.setErrorHandler();

    this.logger.info("App started!");
  }

  public getApp() {
    return this.app;
  }

  private setMiddlewares() {
    this.app.use(cookieParser());
    this.app.use(cors());
    const format = json({
      short: ':method :url :status',
      length: ':res[content-length]',
      'response-time': ':response-time ms'
    });
    this.app.use(morgan(format, { stream: this.logger.getStream() }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
  }

  private setRoutes() {
    this.router = container.get("Routes.index");
    const verificateDomainMiddleware: VerificateDomainMiddleware = container.get(
      "middlewares.verificateDomainMiddleware"
    );

    this.app.use(
      "/:domain",
      verificateDomainMiddleware.handle.bind(verificateDomainMiddleware),
      this.router.getRoutes()
    );
  }

  private static async createDatabaseConnection(): Promise<void> {
    const dbConnection = new DatabaseConnection();
    await dbConnection.getConnection();
  }

  private setErrorHandler(): void {
    this.app.use(errorHandler.logErrors);
    this.app.use(errorHandler.mapApplicationToHTTPErrors);
    this.app.use(errorHandler.reportError);
    this.app.use(errorHandler.execute);
  }
}

import { inject, injectable } from "inversify";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import PublicRoutes from "./Presentation/Http/Routes";
import DatabaseConnection from "./Infrastructure/Persistence/DatabaseConnection";
import * as errorHandler from "./Infrastructure/Debug/ErrorHandler";
import container from "./Infrastructure/DI";
import { VerificateDomainMiddleware } from "./Presentation/Http/Middlewares/VerificateDomainMiddleware";

@injectable()
export default class App {
  private app: Application;
  private router: PublicRoutes;

  public async upServer(express: Application) {
    this.app = express;
    /**
     * Load environment variables from .env file, where API keys and passwords are configured.
     */
    const result = dotenv.config();

    if (result.error) {
      throw new Error(`Environment variables not configured, aborting`);
    }
    await App.createDatabaseConnection();

    this.setMiddlewares();
    this.setRoutes();
    this.setErrorHandler();
  }

  public getApp() {
    return this.app;
  }

  private setMiddlewares() {
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
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

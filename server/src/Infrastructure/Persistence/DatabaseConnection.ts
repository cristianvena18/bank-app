import { ConfigVariables } from "./Config/ConfigVariables";
import { ProductionConfig } from "./Config/ProductionConfig";
import { TestingConfig } from "./Config/TestingConfig";
import { DevelopmentConfig } from "./Config/DevelopmentConfig";
import { Connection, createConnection } from "typeorm";
import {
  isTesting,
  isDevelopment,
  isProduction,
  getMode,
} from "../../Config/mode";

export default class DatabaseConnection {
  public async getConnection(): Promise<Connection> {
    console.log(`Mode: ${getMode()}`);
    console.log(`Host: ${ConfigVariables().db_host}`);

    if (isProduction()) {
      return await createConnection(ProductionConfig());
    } else if (isDevelopment()) {
      return await createConnection(DevelopmentConfig());
    } else if (isTesting()) {
      return await createConnection(TestingConfig());
    } else {
      throw new Error("Not found connection db with current credentials");
    }
  }
}

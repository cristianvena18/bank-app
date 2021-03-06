import { ConnectionOptions } from "typeorm";
import { ConfigVariables } from "./ConfigVariables";

export const DevelopmentConfig = (): ConnectionOptions => ({
  type: "mysql",
  host: ConfigVariables().db_host,
  port: Number(ConfigVariables().db_port),
  username: ConfigVariables().db_username,
  password: ConfigVariables().db_password,
  database: ConfigVariables().db_database,
  synchronize: true,
  logging: false,
  migrations: ["./dist/Infrastructure/Persistence/Migrations/*.js"],
  migrationsTableName: "migrations",
  migrationsRun: true,
  entities: ["./dist/Infrastructure/Persistence/Mappings/*.js"],
  cli: {
    migrationsDir: "./Migrations",
  },
});

export default DevelopmentConfig();

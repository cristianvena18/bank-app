require("dotenv").config();

export const ConfigVariables = () => ({
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_database: "database",
  db_port: 3306,
  db_host: process.env.DB_HOST,
  redis_host: process.env.REDIS_HOST,
  redis_port: +process.env.REDIS_PORT,
});

require("dotenv").config();

export const ConfigVariables = () => ({
  db_username: "test",
  db_password: "test",
  db_database: "database",
  db_port: 3306,
  db_host: "172.17.0.1",
  redis_host: process.env.REDIS_HOST,
  redis_port: +process.env.REDIS_PORT,
});

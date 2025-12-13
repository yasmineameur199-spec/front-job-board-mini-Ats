import { Sequelize } from "sequelize";

export const dataBase = new Sequelize(
  process.env.DB_NAME || "job_board",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

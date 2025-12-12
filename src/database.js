import { Sequelize } from "sequelize";

// à adapter selon ta config locale
const DB_NAME = process.env.DB_NAME || "Job_board";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;        //  
const DB_DIALECT = "mysql";

export const dataBase = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,                                    //
  dialect: DB_DIALECT,
  logging: false,
});

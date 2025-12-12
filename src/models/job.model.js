import { DataTypes } from "sequelize";
import { dataBase } from "../database.js";

const Job = dataBase.define("job", {
  job_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titre: DataTypes.STRING,
  location: DataTypes.STRING,
  employment_type: DataTypes.STRING,
  is_active: DataTypes.BOOLEAN,
  posted_at: DataTypes.DATE,
  id_company: DataTypes.INTEGER
});

export default Job;

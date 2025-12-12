import { DataTypes } from "sequelize";
import { dataBase } from "../database.js";

const JobCategory = dataBase.define("jobCategory", {
  job_id: DataTypes.INTEGER,
  id_category: DataTypes.INTEGER
});

export default JobCategory;

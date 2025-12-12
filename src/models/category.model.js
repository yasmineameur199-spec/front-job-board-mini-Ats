import { DataTypes } from "sequelize";
import { dataBase } from "../database.js";

const Category = dataBase.define("category", {
  category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_category: DataTypes.STRING
});

export default Category;

import { DataTypes } from "sequelize";
import { dataBase } from "../database.js";

const Stage = dataBase.define(
  "Stage",
  {
    stage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_stage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "stage",
    timestamps: false,
  }
);

export default Stage;

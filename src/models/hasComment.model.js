import { DataTypes } from "sequelize";
import { dataBase } from "../database.js";

const HasComment = dataBase.define(
  "HasComment",
  {
    application_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_comment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "hasComment",
    timestamps: false,
  }
);

export default HasComment;

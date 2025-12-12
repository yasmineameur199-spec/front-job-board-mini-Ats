import { DataTypes } from "sequelize";
import { dataBase } from "../database.js";

const UserRole = dataBase.define(
  "userRole",                           // Correction : singulier
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "userRole",              // Correction : singulier
    timestamps: false,
  }
);

export default UserRole;
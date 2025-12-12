import { DataTypes } from "sequelize";
import { dataBase } from "../database.js";

const Role = dataBase.define(
  "role",                                     // Correction : singulier
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Correction Importante : Le modèle physique indique 'role_name' et non 'name'
    role_name: {                              
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "role",                        // Correction : singulier
    timestamps: false,
  }
);

export default Role;
import { DataTypes } from "sequelize";
import { dataBase } from "../database.js";

const Role = dataBase.define(
  "roles",                                    // nom du modèle
  {
    role_id: {                                // PK utilisée dans ton controller
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {                                   // ex: 'ADMIN', 'RECRUITER', 'CANDIDATE'
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

export default Role;

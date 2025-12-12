import { DataTypes } from "sequelize";
import { dataBase } from "../database.js";

const UserRole = dataBase.define(
  "userRoles",                          // nom du modèle
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,                 // fait partie de la PK
    },
    id_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,                 // composite PK (user_id + id_role)
    },
  },
  {
    tableName: "userRoles",             // nom de la table en base
    timestamps: false,                  // pas besoin de createdAt/updatedAt
  }
);

export default UserRole;

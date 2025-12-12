import { DataTypes } from "sequelize";
import { dataBase } from "../database.js";

const ApplicationStage = dataBase.define(
  "ApplicationStage",
  {
    application_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    stage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "application_stage",
    timestamps: false,

    
    // Empêche Sequelize de recréer un index unique automatique
    indexes: []
  }
);

export default ApplicationStage;

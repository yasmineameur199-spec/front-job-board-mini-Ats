import { DataTypes } from "sequelize";
import { dataBase } from "../database.js";

const Comment = dataBase.define(
  "Comment",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    commented_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // FK to User.user_id (association is in index.model.js)
    },
  },
  {
    tableName: "comment",
    timestamps: false,
  }
);

export default Comment;

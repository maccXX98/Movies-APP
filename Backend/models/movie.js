import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Movie = sequelize.define(
  "Movie",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El título no puede estar vacío",
        },
        len: {
          args: [1, 255],
          msg: "El título debe tener entre 1 y 255 caracteres",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La descripción no puede estar vacía",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "movies",
  }
);

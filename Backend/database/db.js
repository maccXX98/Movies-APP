/* eslint-disable no-undef */
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

export const sequelize = new Sequelize(databaseUrl, {
  dialect: process.env.DB_DIALECT,
  logging: process.env.DB_LOGGING === "true" ? (msg) => console.log(msg) : false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    console.error("Stack trace:", error.stack);
  }
};

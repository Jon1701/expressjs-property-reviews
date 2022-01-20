import { Sequelize, DataTypes } from "sequelize";

const RADIX = 10;

// Sequelize instance.
const db = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: Number.parseInt(process.env.POSTGRES_PORT, RADIX),
    dialect: "postgres",
  }
);

export { db };

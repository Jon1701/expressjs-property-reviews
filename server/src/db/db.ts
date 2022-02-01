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

// Postgres connection string.
const connString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

export { db, connString };

import { Sequelize, DataTypes } from "sequelize";

import { db } from "@db/db";

// Postgres connection string.
const connString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

// Maximum allowed length for string fields.
const MAX_STR_LEN = 255;

// Developer model.
const Developer = db.define(
  "Developer",
  {
    developerID: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: "id_hash",
    },
    name: {
      type: DataTypes.STRING(MAX_STR_LEN),
      allowNull: false,
      field: "name",
    },
    addressLine1: {
      type: DataTypes.STRING(MAX_STR_LEN),
      allowNull: false,
      field: "address_line1",
    },
    addressLine2: {
      type: DataTypes.STRING(MAX_STR_LEN),
      allowNull: true,
      field: "address_line2",
    },
    addressCity: {
      type: DataTypes.STRING(MAX_STR_LEN),
      allowNull: false,
      field: "address_city",
    },
    addressState: {
      type: DataTypes.STRING(MAX_STR_LEN),
      allowNull: false,
      field: "address_state",
    },
    addressPostalCode: {
      type: DataTypes.STRING(MAX_STR_LEN),
      allowNull: false,
      field: "address_postalcode",
    },
    addressCountry: {
      type: DataTypes.STRING(MAX_STR_LEN),
      allowNull: false,
      field: "address_country",
    },
    website: {
      type: DataTypes.STRING(MAX_STR_LEN),
      allowNull: true,
      field: "website",
    },
  },
  {
    tableName: "developers",
    underscored: true,
  }
);

export { Developer };

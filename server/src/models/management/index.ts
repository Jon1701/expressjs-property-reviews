import { Sequelize, DataTypes } from "sequelize";

import { db, connString } from "@db/db";

// Maximum allowed length for string fields.
const MAX_STR_LEN = 255;

// ManagementCompany model.
const ManagementCompany = db.define(
  "ManagementCompany",
  {
    managementID: {
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
    tableName: "management_companies",
    underscored: true,
  }
);

export { ManagementCompany };

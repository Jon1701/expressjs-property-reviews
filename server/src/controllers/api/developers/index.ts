import { Request, Response } from "express";
import Sequelize from "sequelize";

import { Developer as InterfaceDeveloper } from "@interfaces/developers";
import { Developer as ModelDeveloper } from "@models/developers";
import { mapObjectToModel, mapModelToObject } from "@json/developers";
import isObjectEmpty from "@util/boolean/isObjectEmpty";
import isValidUUID from "@util/boolean/isValidUUID";

import { validatePostObject, validatePatchObject } from "./validate";

/**
 * Route handler for GET /api/developers.
 *
 * @param req Request object.
 * @param res Response object.
 */
const getDevelopers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get rows.
    const rows = await ModelDeveloper.findAll({
      attributes: [
        "developerID",
        "name",
        "addressLine1",
        "addressLine2",
        "addressCity",
        "addressState",
        "addressPostalCode",
        "addressCountry",
        "website",
      ],
    });

    // Restructure rows for the response body.
    const responseBody = rows.map((item) => mapModelToObject(item.get()));

    res.status(200).json(responseBody);
  } catch (err) {
    res.status(500).send();
  }
};

/**
 * Route handler for GET /api/developers/:developerID.
 *
 * @param req Request object.
 * @param res Response object.
 */
const getSpecificDevelopers = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!isValidUUID(req.params.developerID)) {
    res.status(400).send("Invalid Developer ID");
  }
  try {
    // Get row.
    const row = await ModelDeveloper.findOne({
      attributes: [
        "developerID",
        "name",
        "addressLine1",
        "addressLine2",
        "addressCity",
        "addressState",
        "addressPostalCode",
        "addressCountry",
        "website",
      ],
      where: {
        developerID: req.params.developerID,
      },
    });

    if (row === null) {
      res.status(404).send("Nothing found");
    }

    const responseBody = mapModelToObject(row.get());

    res.status(200).json(responseBody);
  } catch (err) {
    res.status(500).send();
  }
};

/**
 * Route handler for POST /api/developers.
 *
 * @param req Request object.
 * @param res Response object.
 */
const postDevelopers = async (req: Request, res: Response): Promise<void> => {
  // Validate request body.
  const results: InterfaceDeveloper = validatePostObject(req.body);
  if (!isObjectEmpty(results)) {
    res.status(400).json(results);
    return;
  }

  try {
    // Create and persist row.
    const result = await ModelDeveloper.create(mapObjectToModel(req.body), {
      returning: true,
    });

    res
      .status(201)
      .location(`/api/developers/${result.toJSON().developerID}`)
      .send();
  } catch (err) {
    res.status(500).send();
  }
};

/**
 * Route handler for PATCH /api/developers/:developerID.
 *
 * @param req Request object.
 * @param res Response object.
 */
const patchDevelopers = async (req: Request, res: Response): Promise<void> => {
  if (!isValidUUID(req.params.developerID)) {
    res.status(400).send("Invalid Developer ID");
    return;
  }

  const results: InterfaceDeveloper = validatePatchObject(req.body);
  if (!isObjectEmpty(results)) {
    res.status(400).json(results);
    return;
  }

  try {
    const result = await ModelDeveloper.update(mapObjectToModel(req.body), {
      returning: true,
      where: {
        developerID: req.params.developerID,
      },
    });

    res.status(200).send(mapModelToObject(result[1][0].get()));
  } catch (err) {
    res.status(500).send();
  }
};

export {
  getDevelopers,
  getSpecificDevelopers,
  postDevelopers,
  patchDevelopers,
};

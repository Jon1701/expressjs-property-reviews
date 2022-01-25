import { Request, Response } from "express";
import Sequelize from "sequelize";

import { Developer as ModelDeveloper } from "@models/developers";
import isObjectEmpty from "@util/boolean/isObjectEmpty";

import { validatePostObject, validatePatchObject } from "./validate";

interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface Developer {
  id?: string;
  name?: string;
  address?: Address;
  website?: string;
}

/**
 * Route handler for POST /api/developers.
 *
 * @param req Request object.
 * @param res Response object.
 */
const postDevelopers = async (req: Request, res: Response): Promise<void> => {
  // Validate request body.
  const results: Developer = validatePostObject(req.body);
  if (!isObjectEmpty(results)) {
    res.status(400).json(results);
    return;
  }

  try {
    // Create and persist row.
    const result = await ModelDeveloper.create(
      {
        name: req?.body?.name,
        addressLine1: req?.body?.address?.line1,
        addressLine2: req?.body?.address?.line2,
        addressCity: req?.body?.address?.city,
        addressState: req?.body?.address?.state,
        addressPostalCode: req?.body?.address?.postalCode,
        addressCountry: req?.body?.address?.country,
        website: req?.body?.website,
      },
      { returning: true }
    );

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
  // Validate request body.
  const results: Developer = validatePatchObject(req.body);
  if (!isObjectEmpty(results)) {
    res.status(400).json(results);
    return;
  }

  try {
    // Update row.
    const result = await ModelDeveloper.update(
      {
        name: req?.body?.name,
        addressLine1: req?.body?.address?.line1,
        addressLine2: req?.body?.address?.line2,
        addressCity: req?.body?.address?.city,
        addressState: req?.body?.address?.state,
        addressPostalCode: req?.body?.address?.postalCode,
        addressCountry: req?.body?.address?.country,
        website: req?.body?.website,
      },
      {
        returning: true,
        where: {
          developerID: req.params.developerID,
        },
      }
    );

    // Get updated row.
    const retrieved = result[1][0].get();

    // Build response body.
    const resBody: Developer = {
      name: retrieved.name,
      address: {
        line1: retrieved.addressLine1,
        line2: retrieved.addressLine2,
        city: retrieved.addressCity,
        state: retrieved.addressState,
        postalCode: retrieved.addressPostalCode,
        country: retrieved.addressCountry,
      },
      website: retrieved.website,
    };

    res.status(200).send(resBody);
  } catch (err) {
    res.status(500).send();
  }
};

export { postDevelopers, patchDevelopers, Developer };

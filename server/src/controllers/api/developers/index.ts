import { Request, Response } from "express";
import Sequelize from "sequelize";

import { Developer } from "@models/developers";
import isObjectEmpty from "@util/boolean/isObjectEmpty";

import { validatePostObject, ValidationResults } from "./validate";

interface AddressRequestBody {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface DeveloperRequestBody {
  id?: string;
  name?: string;
  address?: AddressRequestBody;
  website?: string;
}

/**
 * Route handler for POST /api/developers.
 *
 * @param req Request object.
 * @param res Response object.
 */
const postDeveloper = async (req: Request, res: Response): Promise<void> => {
  // Validate request body.
  const results: ValidationResults = validatePostObject(req.body);
  if (!isObjectEmpty(results)) {
    res.status(400).json(results);
    return;
  }

  // Developer ID of the newly created row.
  let id: string;

  try {
    // Create and persist row.
    const result = await Developer.create(
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

    id = result.toJSON().developerID;
  } catch (err) {
    res.status(500).send();
    return;
  }

  res.status(201).location(`/api/developer/${id}`).send();
};

export { postDeveloper, DeveloperRequestBody };

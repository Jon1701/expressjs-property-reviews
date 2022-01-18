import { Request, Response } from "express";

import {
  createDeveloper,
  InterfaceCreateDeveloperResult,
} from "@db/developers";
import isObjectEmpty from "@util/boolean/isObjectEmpty";

import { validatePostObject, InterfaceValidationResults } from "./validate";

interface InterfacePostDeveloperAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface InterfacePostDeveloper {
  id?: string;
  name: string;
  address: InterfacePostDeveloperAddress;
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
  const results: InterfaceValidationResults = validatePostObject(req.body);
  if (!isObjectEmpty(results)) {
    res.status(400).json(results);
    return;
  }

  // Destructure request body.
  const { name, address, website } = req.body;
  const { line1, line2, city, state, postalCode, country } = address;

  // Persist into database.
  const result = await createDeveloper(
    name,
    line1,
    line2,
    city,
    state,
    postalCode,
    country,
    website
  );

  // If result was not persisted, return 500 Internal Server Error.
  if (result === null) {
    res.status(500).send();
  }

  // Return Location header with ID of the created object.
  res
    .status(201)
    .location("/api/developers/" + result.id_hash)
    .send();
};

export { postDeveloper, InterfacePostDeveloper };

import { Request, Response } from "express";

import isObjectEmpty from "@util/boolean/isObjectEmpty";

import { validatePostObject } from "./validate";

/**
 * Route handler for POST /api/developers.
 *
 * @param req Request object.
 * @param res Response object.
 */
const postDeveloper = (req: Request, res: Response): void => {
  // Return 400 Bad Request if request body fails validation.
  const results = validatePostObject(req.body);
  if (!isObjectEmpty(results)) {
    res.status(400).json(results);
    return;
  }

  res.status(200).send("ok");
};

export { postDeveloper };

import { Request, Response } from "express";

import { ManagementCompany as ModelManagementCompany } from "@models/management";
import { mapModelToObject, mapObjectToModel } from "@json/management";
import isObjectEmpty from "@util/boolean/isObjectEmpty";

import { validatePostObject, validatePatchObject } from "./validate";

/**
 * Route handler for POST /api/management.
 *
 * @param req Request object.
 * @param res Response object.
 */
const postManagement = async (req: Request, res: Response): Promise<void> => {
  // Validate request body.
  const validationResults = validatePostObject(req.body);
  if (!isObjectEmpty(validationResults)) {
    res.status(400).json(validationResults);
    return;
  }

  try {
    const result = await ModelManagementCompany.create(
      mapObjectToModel(req.body),
      { returning: true }
    );

    res
      .status(201)
      .location(`/api/management/${result.toJSON().managementID}`)
      .send();
  } catch (err) {
    res.status(500).send();
  }
};

/**
 * Route handler for PATCH /api/management/:managementID.
 *
 * @param req Request object.
 * @param res Response object.
 */
const patchManagement = async (req: Request, res: Response): Promise<void> => {
  const validationResults = validatePatchObject(req.body);
  if (!isObjectEmpty(validationResults)) {
    res.status(400).json(validationResults);
    return;
  }

  try {
    const result = await ModelManagementCompany.update(
      mapObjectToModel(req.body),
      {
        where: {
          managementID: req.params.managementID,
        },
        returning: true,
      }
    );

    res.status(200).json(mapModelToObject(result[1][0].get()));
  } catch (err) {
    res.status(500).send();
  }
};

export { postManagement, patchManagement };

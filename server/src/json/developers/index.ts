import {
  Developer as InterfaceDeveloper,
  DeveloperModel as InterfaceDeveloperModel,
} from "@interfaces/developers";

/**
 * Maps a Developer object, usually from a Request Body, into the structure used
 * by a Developer model.
 *
 * @param obj Developer object (usually from Request Body).
 * @returns Object structure used by the Developer model.
 */
const mapObjectToModel = (
  obj: InterfaceDeveloper
): InterfaceDeveloperModel => ({
  name: obj?.name,
  addressLine1: obj?.address?.line1,
  addressLine2: obj?.address?.line2,
  addressCity: obj?.address?.city,
  addressState: obj?.address?.state,
  addressPostalCode: obj?.address?.postalCode,
  addressCountry: obj?.address?.country,
  website: obj?.website,
});

/**
 * Maps an object used by the Developer model, into the structure used by a Developer
 * Request/Response Body or Field Validation.
 *
 * @param dmo Developer model object.
 * @returns Object used by Request/Response body or field validation.
 */
const mapModelToObject = (
  dmo: InterfaceDeveloperModel
): InterfaceDeveloper => ({
  id: dmo?.developerID,
  name: dmo?.name,
  address: {
    line1: dmo?.addressLine1,
    line2: dmo?.addressLine2,
    city: dmo?.addressCity,
    state: dmo?.addressState,
    postalCode: dmo?.addressPostalCode,
    country: dmo?.addressCountry,
  },
  website: dmo?.website,
});

export { mapObjectToModel, mapModelToObject };

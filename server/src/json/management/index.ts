import {
  ManagementCompany as InterfaceManagementCompany,
  ManagementCompanyModel as InterfaceManagementCompanyModel,
} from "@interfaces/management";

/**
 * Maps a Management Company object, usually from a Request Body,
 * into the structure used by a ManagementCompany model.
 *
 * @param obj Developer object (usually from Request Body).
 * @returns Object structure used by the ManagementCompany model.
 */
const mapObjectToModel = (
  obj: InterfaceManagementCompany
): InterfaceManagementCompanyModel => ({
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
 * Maps an object used by the ManagementCompany model, into the structure
 * used by a ManagementCompany Request/Response Body or Field Validation.
 *
 * @param dmo Management Company model object.
 * @returns Object used by Request/Response body or field validation.
 */
const mapModelToObject = (
  mcmo: InterfaceManagementCompanyModel
): InterfaceManagementCompany => ({
  id: mcmo?.managementID,
  name: mcmo?.name,
  address: {
    line1: mcmo?.addressLine1,
    line2: mcmo?.addressLine2,
    city: mcmo?.addressCity,
    state: mcmo?.addressState,
    postalCode: mcmo?.addressPostalCode,
    country: mcmo?.addressCountry,
  },
  website: mcmo?.website,
});

export { mapObjectToModel, mapModelToObject };

import { InterfacePostDeveloper } from "@controllers/api/developers";

import isObject from "@util/boolean/isObject";
import isObjectEmpty from "@util/boolean/isObjectEmpty";
import isString from "@util/boolean/isString";
import isStringBetweenLength from "@util/boolean/isStringBetweenLength";
import isValidPostalCode from "@util/boolean/isValidPostalCode";

interface InterfaceValidationResultsAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface InterfaceValidationResults {
  id?: string;
  name?: string;
  address?: InterfaceValidationResultsAddress;
  website?: string;
}

/**
 * Builds a string which indicates how many characters a string must be between.
 *
 * @param minLength Minimum number of characters (as an integer).
 * @param maxLength Maximum number of characters (as an integer).
 * @returns String message.
 */
const strMustBeBetweenNumCharactersLong = (
  minLength: number,
  maxLength: number
): string => `must be between ${minLength} and ${maxLength} characters long`;

/**
 * Builds a string which indicates how many characters a string must have.
 *
 * @param requiredLength Number of characters required (as an integer).
 * @returns String message.
 */
const strMustHaveLength = (requiredLength: number): string =>
  `must have a length of ${requiredLength} characters`;

// String which indicates that a field value is required.
const strFieldValueRequired = "field value required";

// String which indicates the postal code is invalid.
const strInvalidPostalCode = "invalid postal code";

// Minimum number of characters for string messages.
const STR_MIN_LEN = 1;

// Maximum number of characters for string messages.
const STR_MAX_LEN = 255;

// Required number of characters for the Postal Code field.
const STR_POSTALCODE_LEN = 6;

/**
 * Validates the POST request body.
 *
 * @param developer Request body.
 * @returns Validation error messages.
 */
const validatePostObject = (
  developer: InterfacePostDeveloper
): InterfaceValidationResults => {
  const results: InterfaceValidationResults = {};

  // Destructure properties.
  const { name, address, website } = developer;

  // Check if `name` field is provided.
  if (!isString(name)) {
    results.name = strFieldValueRequired;
  }

  // Check if `name` field is a string and has allowed length.
  if (
    isString(name) &&
    !isStringBetweenLength(name, STR_MIN_LEN, STR_MAX_LEN)
  ) {
    results.name = strMustBeBetweenNumCharactersLong(STR_MIN_LEN, STR_MAX_LEN);
  }

  results.address = {};

  // Check if `address.line1` is provided.
  if (!isString(address?.line1)) {
    results.address.line1 = strFieldValueRequired;
  }

  // Check if `address.line1` has required length.
  if (
    isString(address?.line1) &&
    !isStringBetweenLength(address.line1, STR_MIN_LEN, STR_MAX_LEN)
  ) {
    results.address.line1 = strMustBeBetweenNumCharactersLong(
      STR_MIN_LEN,
      STR_MAX_LEN
    );
  }

  // Check if `address.line2` has required length.
  if (
    isString(address?.line2) &&
    !isStringBetweenLength(address.line2, STR_MIN_LEN, STR_MAX_LEN)
  ) {
    results.address.line2 = strMustBeBetweenNumCharactersLong(
      STR_MIN_LEN,
      STR_MAX_LEN
    );
  }

  // Check if `address.city` is provided.
  if (!isString(address?.city)) {
    results.address.city = strFieldValueRequired;
  }

  // Check if `address.city` has required length.
  if (
    isString(address?.city) &&
    !isStringBetweenLength(address.city, STR_MIN_LEN, STR_MAX_LEN)
  ) {
    results.address.city = strMustBeBetweenNumCharactersLong(
      STR_MIN_LEN,
      STR_MAX_LEN
    );
  }

  // Check if `address.state` is provided.
  if (!isString(address?.state)) {
    results.address.state = strFieldValueRequired;
  }

  // Check if `address.state` has required length.
  if (
    isString(address?.state) &&
    !isStringBetweenLength(address.state, STR_MIN_LEN, STR_MAX_LEN)
  ) {
    results.address.state = strMustBeBetweenNumCharactersLong(
      STR_MIN_LEN,
      STR_MAX_LEN
    );
  }

  // Check if `address.postalCode` is provided.
  if (!isString(address?.postalCode)) {
    results.address.postalCode = strFieldValueRequired;
  }

  // Check if `address.postalCode` has required length.
  if (
    isString(address?.postalCode) &&
    !isValidPostalCode(address.postalCode.toUpperCase())
  ) {
    results.address.postalCode = strInvalidPostalCode;
  }

  // Check if `address.country` is provided.
  if (!isString(address?.country)) {
    results.address.country = strFieldValueRequired;
  }

  // Check if `address.country` has required length.
  if (
    isString(address?.country) &&
    !isStringBetweenLength(address.country, STR_MIN_LEN, STR_MAX_LEN)
  ) {
    results.address.country = strMustBeBetweenNumCharactersLong(
      STR_MIN_LEN,
      STR_MAX_LEN
    );
  }

  // Check if `website` has required length.
  if (
    isString(website) &&
    !isStringBetweenLength(website, STR_MIN_LEN, STR_MAX_LEN)
  ) {
    results.website = strMustBeBetweenNumCharactersLong(
      STR_MIN_LEN,
      STR_MAX_LEN
    );
  }

  // Delete `results.address` if it is an empty object.
  if (isObjectEmpty(results.address)) {
    delete results.address;
  }

  return results;
};

export { validatePostObject, InterfaceValidationResults };

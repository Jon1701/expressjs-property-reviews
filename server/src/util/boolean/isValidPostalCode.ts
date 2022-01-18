const patternPostalCode =
  /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/;

/**
 * Checks if the given string is a valid postal code.
 *
 * @param str String to check.
 * @param postalCode Postal code.
 * @returns Whether or not the given string is a valid postal code.
 */
const isValidPostalCode = (postalCode: string): boolean =>
  patternPostalCode.test(postalCode);

export default isValidPostalCode;

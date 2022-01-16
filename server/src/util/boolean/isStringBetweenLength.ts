const RADIX = 10;

/**
 * Checks if the given string is within a given length.
 *
 * @param str String to check.
 * @param minLength Minimum number of characters (as an integer).
 * @param maxLength Maximum number of characters (as an integer).
 * @returns Whether or not the given string is within a given length.
 */
const isStringBetweenLength = (
  str: string,
  minLength: number,
  maxLength: number
): boolean =>
  str.length >= Number.parseInt(String(minLength), RADIX) &&
  str.length <= Number.parseInt(String(maxLength), RADIX);

export default isStringBetweenLength;

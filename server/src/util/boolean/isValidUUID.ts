const patternUUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Checks if the given string is a valid UUIDv4.
 *
 * @param str String to check.
 * @returns Whether or not the given string is a valid UUIDv4.
 */
const isValidUUID = (str: string): boolean => patternUUID.test(str);

export default isValidUUID;

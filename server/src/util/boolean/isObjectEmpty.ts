/**
 * Checks if the argument is an empty Object.
 *
 * @param o Object to check.
 * @returns Whether or not the given Object is empty.
 */
const isObjectEmpty = (o: Object): boolean => Object.keys(o).length === 0;

export default isObjectEmpty;

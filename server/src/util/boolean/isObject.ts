/**
 * Check if the given argument is an Object.
 *
 * @param o Argument to check if it is an Object.
 * @returns Whether or not the argument is an Object.
 */
const isObject = (o: any): boolean =>
  Object.prototype.toString.call(o) === "[object Object]";

export default isObject;

import { executeTransaction, TransactionResult } from "@db/db";

interface InterfaceCreateDeveloperResult {
  id_hash: string;
  name: string;
  address_line1: string;
  address_line2?: string;
  address_city: string;
  address_state: string;
  address_postalcode: string;
  address_country: string;
  website?: string;
}

/**
 * Persists a Developer row into the database.
 *
 * @param name Name.
 * @param address_line1 Line 1 address.
 * @param address_line2 Line 2 address.
 * @param address_city Address city.
 * @param address_state Address state.
 * @param address_postalcode Address postal code.
 * @param address_country Address country.
 * @param website Website URL.
 * @returns Created row as an Object, or null if an error occurred.
 */
const createDeveloper = async (
  name: string,
  address_line1: string,
  address_line2: string,
  address_city: string,
  address_state: string,
  address_postalcode: string,
  address_country: string,
  website: string
): Promise<InterfaceCreateDeveloperResult | null> => {
  // Execute transaction.
  const txResult: TransactionResult = await executeTransaction(
    `INSERT INTO developers(
      name,
      address_line1,
      address_line2,
      address_city,
      address_state,
      address_postalcode,
      address_country,
      website
    ) VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8
    ) RETURNING
      id_hash,
      name,
      address_line1,
      address_line2,
      address_city,
      address_state,
      address_postalcode,
      address_country,
      website
    `,
    [
      name,
      address_line1,
      address_line2,
      address_city,
      address_state,
      address_postalcode,
      address_country,
      website,
    ]
  );

  // Return null if an error occurred.
  if (txResult.result.command !== "INSERT") {
    return null;
  }

  // Create object containing the persisted row.
  const row = txResult.result.rows[0];
  const result: InterfaceCreateDeveloperResult = {
    id_hash: row.id_hash,
    name: row.name,
    address_line1: row.address_line1,
    address_line2: row.address_line2,
    address_city: row.address_city,
    address_state: row.address_state,
    address_postalcode: row.address_postalcode,
    address_country: row.address_country,
    website: row.website,
  };

  return result;
};

export { createDeveloper, InterfaceCreateDeveloperResult };

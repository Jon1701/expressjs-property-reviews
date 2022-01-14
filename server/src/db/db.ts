import { Pool, Result } from "pg";

// Connection information.
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_HOST,
});

// Transaction result.
interface InterfaceTransactionResult {
  result: Result | null;
  error: Result | null;
}

/**
 * Executes a transaction.
 *
 * @param query SQL query.
 * @param argsArray Array of arguments.
 * @returns {Promise<InterfaceTransactionResult>} Transaction result.
 */
const executeTransaction = async (
  query: string,
  argsArray
): Promise<InterfaceTransactionResult> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await client.query(query, argsArray);
    await client.query("COMMIT");

    const payload: InterfaceTransactionResult = {
      result,
      error: null,
    };

    return payload;
  } catch (e) {
    const result = await client.query("ROLLBACK");

    const payload: InterfaceTransactionResult = {
      result: null,
      error: result,
    };

    return payload;
  } finally {
    client.release();
  }
};

export { executeTransaction, InterfaceTransactionResult };

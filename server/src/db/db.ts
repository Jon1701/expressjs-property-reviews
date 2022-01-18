import { Pool, Result as TransactionResult } from "pg";

// Connection information.
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  host: process.env.POSTGRES_HOST,
});

/**
 * Executes a transaction.
 *
 * @param query SQL query.
 * @param argsArray Array of arguments.
 * @returns {Promise<TransactionResult>} Transaction result.
 */
const executeTransaction = async (
  query: string,
  argsArray
): Promise<TransactionResult> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await client.query(query, argsArray);
    await client.query("COMMIT");

    const payload: TransactionResult = {
      result,
      error: null,
    };

    return payload;
  } catch (e) {
    const result = await client.query("ROLLBACK");

    const payload: TransactionResult = {
      result: null,
      error: result,
    };

    return payload;
  } finally {
    client.release();
  }
};

export { executeTransaction, TransactionResult };

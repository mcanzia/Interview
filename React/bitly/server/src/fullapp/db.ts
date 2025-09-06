import pg from "pg";
import "dotenv/config";

export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    // ssl: { rejectUnauthorized: false }, // <- enable if you use a hosted DB that requires SSL
});

export async function query(text: any, params?: any) {
    const res = await pool.query(text, params);
    return res;
}

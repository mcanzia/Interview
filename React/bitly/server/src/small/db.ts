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

export const insertSql = `
                INSERT INTO urls (original_url)
                VALUES ($1)
                ON CONFLICT (original_url) DO NOTHING
                RETURNING id
                `;

export const fetchUrlByUrlSql = `SELECT id FROM urls WHERE original_url = $1`;
export const fetchUrlByIdSql = `SELECT original_url FROM urls WHERE id = $1`;
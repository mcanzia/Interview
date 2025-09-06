import { query } from "./db";

export class UrlDao {

    constructor() {
    }

    async insertOriginalUrl(cleanedUrl: string) {
        const insertSql = `
        INSERT INTO urls (original_url)
        VALUES ($1)
        ON CONFLICT (original_url) DO NOTHING
        RETURNING id
        `;
        const inserted = await query(insertSql, [cleanedUrl]);
        return inserted;
    }

    async fetchUrlByUrl(cleanedUrl: string) {
        const existing = await query(`SELECT id FROM urls WHERE original_url = $1`, [cleanedUrl]);
        return existing;
    }

    async fetchUrlById(id: number) {
        const urlRow = await query(`SELECT original_url FROM urls WHERE id = $1`, [id]);
        return urlRow;
    }

}
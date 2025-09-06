"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlDao = void 0;
const db_1 = require("./db");
class UrlDao {
    constructor() {
    }
    async insertOriginalUrl(cleanedUrl) {
        const insertSql = `
        INSERT INTO urls (original_url)
        VALUES ($1)
        ON CONFLICT (original_url) DO NOTHING
        RETURNING id
        `;
        const inserted = await (0, db_1.query)(insertSql, [cleanedUrl]);
        return inserted;
    }
    async fetchUrlByUrl(cleanedUrl) {
        const existing = await (0, db_1.query)(`SELECT id FROM urls WHERE original_url = $1`, [cleanedUrl]);
        return existing;
    }
    async fetchUrlById(id) {
        const urlRow = await (0, db_1.query)(`SELECT original_url FROM urls WHERE id = $1`, [id]);
        return urlRow;
    }
}
exports.UrlDao = UrlDao;

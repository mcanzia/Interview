"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUrlByIdSql = exports.fetchUrlByUrlSql = exports.insertSql = exports.pool = void 0;
exports.query = query;
const pg_1 = __importDefault(require("pg"));
require("dotenv/config");
exports.pool = new pg_1.default.Pool({
    connectionString: process.env.DATABASE_URL,
    // ssl: { rejectUnauthorized: false }, // <- enable if you use a hosted DB that requires SSL
});
async function query(text, params) {
    const res = await exports.pool.query(text, params);
    return res;
}
exports.insertSql = `
                INSERT INTO urls (original_url)
                VALUES ($1)
                ON CONFLICT (original_url) DO NOTHING
                RETURNING id
                `;
exports.fetchUrlByUrlSql = `SELECT id FROM urls WHERE original_url = $1`;
exports.fetchUrlByIdSql = `SELECT original_url FROM urls WHERE id = $1`;

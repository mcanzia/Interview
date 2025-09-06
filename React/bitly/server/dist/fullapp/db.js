"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = migrate;
// src/migrate.js
const db_1 = require("./db");
async function migrate() {
    await (0, db_1.query)(`
    CREATE TABLE IF NOT EXISTS urls (
      id           BIGSERIAL PRIMARY KEY,
      original_url TEXT NOT NULL UNIQUE,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
    // helpful indexes
    await (0, db_1.query)(`CREATE INDEX IF NOT EXISTS idx_urls_created_at ON urls(created_at DESC);`);
}

// src/migrate.js
import { query } from "./db";

export async function migrate() {
    await query(`
    CREATE TABLE IF NOT EXISTS urls (
      id           BIGSERIAL PRIMARY KEY,
      original_url TEXT NOT NULL UNIQUE,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

    // helpful indexes
    await query(`CREATE INDEX IF NOT EXISTS idx_urls_created_at ON urls(created_at DESC);`);
}

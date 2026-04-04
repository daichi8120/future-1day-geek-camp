import postgres from "postgres";

// channel_binding パラメータを除去 (postgres.js 非対応)
const raw = process.env.DATABASE_URL ?? "";
const url = raw.replace(/[?&]channel_binding=[^&]*/g, "");

const sql = postgres(url, {
  ssl: url ? "require" : undefined,
});

export default sql;

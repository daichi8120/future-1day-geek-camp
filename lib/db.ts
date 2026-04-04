import postgres from "postgres";

// channel_binding パラメータを除去 (postgres.js 非対応)
const url = process.env.DATABASE_URL!.replace(/[?&]channel_binding=[^&]*/g, "");

const sql = postgres(url, {
  ssl: "require",
});

export default sql;

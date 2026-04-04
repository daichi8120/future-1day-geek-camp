import { betterAuth } from "better-auth";
import { Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";

console.log("[auth-init] 初期化開始", {
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  VERCEL_URL: process.env.VERCEL_URL,
  DATABASE_URL: process.env.DATABASE_URL ? "設定済み" : "未設定",
});

const url = process.env.DATABASE_URL!.replace(
  /[?&]channel_binding=[^&]*/g,
  ""
);

const dialect = new PostgresJSDialect({
  postgres: postgres(url, { ssl: "require" }),
});

const baseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

export const auth = betterAuth({
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    ...(baseURL ? [baseURL] : []),
    ...(process.env.VERCEL_URL
      ? [`https://${process.env.VERCEL_URL}`]
      : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : []),
  ],
  database: {
    dialect,
    type: "postgres",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
  },
});

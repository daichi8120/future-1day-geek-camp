import { betterAuth } from "better-auth";
import { Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";

const raw = process.env.DATABASE_URL ?? "";
const url = raw.replace(/[?&]channel_binding=[^&]*/g, "");

const dialect = new PostgresJSDialect({
  postgres: postgres(url, { ssl: url ? "require" : undefined }),
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
    // Cloud Run の URL パターン
    ...(process.env.CLOUD_RUN_URL ? [process.env.CLOUD_RUN_URL] : []),
    "https://osaki-tei-app-o62lp67f5a-an.a.run.app",
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

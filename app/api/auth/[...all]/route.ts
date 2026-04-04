import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { type NextRequest } from "next/server";

const handler = toNextJsHandler(auth);

export const GET = async (req: NextRequest) => {
  console.log("[auth-api] GET", req.nextUrl.pathname);
  try {
    const res = await handler.GET(req);
    console.log("[auth-api] GET 完了", { status: res.status });
    return res;
  } catch (err) {
    console.error("[auth-api] GET 例外:", err);
    throw err;
  }
};

export const POST = async (req: NextRequest) => {
  console.log("[auth-api] POST", req.nextUrl.pathname);
  try {
    const res = await handler.POST(req);
    console.log("[auth-api] POST 完了", { status: res.status });
    return res;
  } catch (err) {
    console.error("[auth-api] POST 例外:", err);
    throw err;
  }
};

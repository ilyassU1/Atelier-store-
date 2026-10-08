import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "../db";
import * as schema from "../db/schema";
import { assertAuthSecret } from "./auth-secret";

assertAuthSecret();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // nextCookies must stay last so server actions can set auth cookies.
  plugins: [nextCookies()],
});

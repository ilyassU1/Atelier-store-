import { assertAuthSecret } from "./lib/auth-secret";

// Runs once before the server accepts requests, so a weak secret stops the
// deployment instead of surfacing on the first auth request.
export function register() {
  assertAuthSecret();
}

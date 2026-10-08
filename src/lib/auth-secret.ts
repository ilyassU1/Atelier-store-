// Better Auth signs its HS256 verification tokens and encrypts its cookies with
// this secret, but only warns when it is short or guessable. A forged
// change-email token is enough to take over an account, so refuse to run with a
// secret that is not random key material.

// An HS256 key must be at least as long as the hash output (RFC 7518 §3.2).
const MIN_SECRET_BYTES = 32;
// 32 random bytes hold fewer distinct values than this about once in 10^9 keys.
const MIN_DISTINCT_BYTES = 20;

const HEX = /^(?:[0-9a-f]{2})+$/i;
const BASE64 = /^(?:[A-Za-z0-9+/]+={0,2}|[A-Za-z0-9_-]+)$/;

// Hex is tried first: read as base64 the same characters would claim more bytes
// than they carry.
function decodeSecret(secret: string): Uint8Array | null {
  if (HEX.test(secret)) {
    return Uint8Array.from(secret.match(/../g) ?? [], (pair) =>
      parseInt(pair, 16),
    );
  }
  if (!BASE64.test(secret)) return null;
  try {
    const binary = atob(
      secret.replace(/-/g, "+").replace(/_/g, "/").replace(/=+$/, ""),
    );
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  } catch {
    return null;
  }
}

function secretWeakness(secret: string): string | null {
  const bytes = decodeSecret(secret);
  if (!bytes) return "it is not hex or base64";
  if (bytes.length < MIN_SECRET_BYTES) {
    return `it decodes to fewer than ${MIN_SECRET_BYTES} bytes`;
  }
  // Repeated or padded values, and single-case words spelled in the base64
  // alphabet, which random base64 of this length never produces in practice.
  const singleCase =
    !HEX.test(secret) && !(/[a-z]/.test(secret) && /[A-Z]/.test(secret));
  if (new Set(bytes).size < MIN_DISTINCT_BYTES || singleCase) {
    return "it does not look randomly generated";
  }
  return null;
}

// Covers every variable Better Auth reads a secret from. Messages name the
// variable only, never its value.
export function assertAuthSecret(env: NodeJS.ProcessEnv = process.env): void {
  const secrets: [name: string, value: string][] = [];
  if (env.BETTER_AUTH_SECRETS) {
    env.BETTER_AUTH_SECRETS.split(",").forEach((entry, index) => {
      const value = entry.slice(entry.indexOf(":") + 1).trim();
      secrets.push([`BETTER_AUTH_SECRETS entry ${index + 1}`, value]);
    });
  }
  if (env.BETTER_AUTH_SECRET) {
    secrets.push(["BETTER_AUTH_SECRET", env.BETTER_AUTH_SECRET]);
  } else if (env.AUTH_SECRET) {
    secrets.push(["AUTH_SECRET", env.AUTH_SECRET]);
  }

  if (secrets.length === 0) {
    throw new Error("BETTER_AUTH_SECRET is not set");
  }
  for (const [name, value] of secrets) {
    const weakness = secretWeakness(value);
    if (weakness) {
      throw new Error(
        `${name} is too weak: ${weakness}. Generate one with \`openssl rand -base64 32\`.`,
      );
    }
  }
}

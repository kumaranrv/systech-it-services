// lib/adminAuth.ts
// Lightweight admin session — only ADMIN_SECRET is needed, no second secret.
// Session cookie = SHA-256(ADMIN_SECRET) so the raw password never lives in the cookie.

const COOKIE_NAME = "admin_session";

function getAdminSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET env variable is not set.");
  return secret;
}

async function sha256hex(str: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Token stored in the cookie = SHA-256(ADMIN_SECRET). */
export async function generateToken(): Promise<string> {
  return sha256hex(getAdminSecret());
}

/** Validate a cookie token. */
export async function validateToken(token: string): Promise<boolean> {
  try {
    const expected = await generateToken();
    const a = await sha256hex(token);
    const b = await sha256hex(expected);
    return a === b;
  } catch {
    return false;
  }
}

/** Verify the plain-text password submitted at the login form. */
export async function verifyPassword(password: string): Promise<boolean> {
  try {
    const a = await sha256hex(password);
    const b = await sha256hex(getAdminSecret());
    return a === b;
  } catch {
    return false;
  }
}

export { COOKIE_NAME };

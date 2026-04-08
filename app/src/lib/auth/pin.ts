/**
 * Parent PIN hashing — server-only.
 *
 * Uses node:crypto scrypt with a per-user random salt. We intentionally do NOT
 * pull in bcrypt/argon2 as deps: scrypt is built into Node and gives the same
 * password-hashing guarantees (memory-hard, per-user salt, tunable cost).
 *
 * Stored format: `scrypt$<salt_hex>$<hash_hex>`
 * - salt: 16 random bytes
 * - hash: 64 bytes derived via scrypt(N=16384, r=8, p=1)
 *
 * verifyPin() also accepts the legacy SHA-256 format (64-char hex, no prefix)
 * so pre-launch dev data keeps working until the parent resets their PIN.
 */
import { randomBytes, scrypt, timingSafeEqual, createHash } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number
) => Promise<Buffer>;

const SCRYPT_KEYLEN = 64;

export async function hashPin(pin: string): Promise<string> {
  const salt = randomBytes(16);
  const derived = await scryptAsync(pin, salt, SCRYPT_KEYLEN);
  return `scrypt$${salt.toString("hex")}$${derived.toString("hex")}`;
}

export async function verifyPin(pin: string, stored: string): Promise<boolean> {
  if (!stored) return false;

  if (stored.startsWith("scrypt$")) {
    const parts = stored.split("$");
    if (parts.length !== 3) return false;
    const salt = Buffer.from(parts[1], "hex");
    const expected = Buffer.from(parts[2], "hex");
    if (expected.length !== SCRYPT_KEYLEN) return false;
    const derived = await scryptAsync(pin, salt, SCRYPT_KEYLEN);
    return timingSafeEqual(derived, expected);
  }

  // Legacy SHA-256 (pre-launch dev data). Constant-time compare.
  if (/^[0-9a-f]{64}$/i.test(stored)) {
    const legacy = createHash("sha256")
      .update(pin + "nolla_salt_v1")
      .digest("hex");
    const a = Buffer.from(legacy, "hex");
    const b = Buffer.from(stored, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  }

  return false;
}

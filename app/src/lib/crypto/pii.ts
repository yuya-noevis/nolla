/**
 * At-rest encryption for sensitive PII (diagnosis, ld_types).
 *
 * Uses AES-256-GCM with a key from env `NOLLA_PII_KEY` (64 hex chars = 32 bytes).
 * - If the env var is missing, encryption is a no-op (plaintext passthrough).
 *   This lets dev/staging run without setup; production should always set the key.
 * - Ciphertext format: `enc:v1:<base64(iv|tag|ciphertext)>`
 * - Decryption auto-detects the prefix; legacy plaintext rows remain readable.
 *
 * Threat model: leaked DB snapshots, platform-admin curiosity, future
 * research-API exports. Does NOT defend against a compromised app server,
 * since the key sits in env at runtime.
 */
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const PREFIX = "enc:v1:";
const ALGO = "aes-256-gcm";
const IV_LENGTH = 12; // 96-bit IV is the GCM standard
const TAG_LENGTH = 16;

function getKey(): Buffer | null {
  const hex = process.env.NOLLA_PII_KEY;
  if (!hex) return null;
  if (hex.length !== 64) {
    // Misconfigured key — fail closed by treating as missing.
    // We log once per process to surface the issue without leaking the key.
    if (!warnedAboutKey) {
      warnedAboutKey = true;
      console.warn(
        "[pii] NOLLA_PII_KEY must be 64 hex chars (32 bytes); ignoring."
      );
    }
    return null;
  }
  return Buffer.from(hex, "hex");
}

let warnedAboutKey = false;

export function encryptString(plain: string): string {
  const key = getKey();
  if (!key) return plain;

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGO, key, iv);
  const ct = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  const payload = Buffer.concat([iv, tag, ct]).toString("base64");
  return PREFIX + payload;
}

export function decryptString(value: string): string {
  if (!value.startsWith(PREFIX)) return value; // legacy plaintext
  const key = getKey();
  if (!key) {
    // Encrypted data exists but key is missing — return placeholder rather
    // than throwing, so the UI degrades gracefully.
    return "";
  }

  try {
    const buf = Buffer.from(value.slice(PREFIX.length), "base64");
    const iv = buf.subarray(0, IV_LENGTH);
    const tag = buf.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
    const ct = buf.subarray(IV_LENGTH + TAG_LENGTH);
    const decipher = createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(tag);
    const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
    return pt.toString("utf8");
  } catch {
    return "";
  }
}

export function encryptStringArray(values: readonly string[]): string[] {
  return values.map(encryptString);
}

export function decryptStringArray(values: readonly string[]): string[] {
  return values.map(decryptString).filter((v) => v.length > 0);
}

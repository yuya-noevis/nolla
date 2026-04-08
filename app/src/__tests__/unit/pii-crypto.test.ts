import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  encryptString,
  decryptString,
  encryptStringArray,
  decryptStringArray,
} from "@/lib/crypto/pii";

const TEST_KEY =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

describe("PII crypto", () => {
  describe("with key configured", () => {
    beforeEach(() => {
      process.env.NOLLA_PII_KEY = TEST_KEY;
    });
    afterEach(() => {
      delete process.env.NOLLA_PII_KEY;
    });

    it("round-trips a string through encrypt/decrypt", () => {
      const ct = encryptString("ASD");
      expect(ct.startsWith("enc:v1:")).toBe(true);
      expect(decryptString(ct)).toBe("ASD");
    });

    it("produces different ciphertexts for the same plaintext (random IV)", () => {
      const a = encryptString("ASD");
      const b = encryptString("ASD");
      expect(a).not.toBe(b);
      expect(decryptString(a)).toBe("ASD");
      expect(decryptString(b)).toBe("ASD");
    });

    it("round-trips arrays", () => {
      const ct = encryptStringArray(["ASD", "ADHD"]);
      expect(ct).toHaveLength(2);
      expect(ct.every((v) => v.startsWith("enc:v1:"))).toBe(true);
      expect(decryptStringArray(ct)).toEqual(["ASD", "ADHD"]);
    });

    it("decryptString passes through legacy plaintext", () => {
      expect(decryptString("ASD")).toBe("ASD");
    });

    it("decryptStringArray handles mixed legacy + encrypted", () => {
      const ct = encryptString("ADHD");
      expect(decryptStringArray(["ASD", ct])).toEqual(["ASD", "ADHD"]);
    });

    it("returns empty string for tampered ciphertext", () => {
      const ct = encryptString("ASD");
      const tampered = ct.slice(0, -4) + "XXXX";
      expect(decryptString(tampered)).toBe("");
    });
  });

  describe("without key", () => {
    beforeEach(() => {
      delete process.env.NOLLA_PII_KEY;
    });

    it("encryptString is a no-op", () => {
      expect(encryptString("ASD")).toBe("ASD");
    });

    it("encryptStringArray is a no-op", () => {
      expect(encryptStringArray(["ASD", "ADHD"])).toEqual(["ASD", "ADHD"]);
    });

    it("decryptString returns plaintext as-is", () => {
      expect(decryptString("ASD")).toBe("ASD");
    });
  });

  describe("with malformed key", () => {
    beforeEach(() => {
      process.env.NOLLA_PII_KEY = "tooshort";
    });
    afterEach(() => {
      delete process.env.NOLLA_PII_KEY;
    });

    it("falls back to no-op encryption", () => {
      expect(encryptString("ASD")).toBe("ASD");
    });
  });
});

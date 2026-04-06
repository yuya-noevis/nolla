"use client";

import { signInWithEmail, signUpWithEmail, signInWithOAuth } from "@/lib/auth/actions";
import { useState } from "react";

type Mode = "signin" | "signup";

export default function OnboardingPage() {
  const [mode, setMode] = useState<Mode>("signup");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);

    const result = mode === "signup"
      ? await signUpWithEmail(formData)
      : await signInWithEmail(formData);

    if (result && !result.success) {
      setError(result.error);
    }
    setLoading(false);
  }

  async function handleOAuth(provider: "apple" | "google") {
    setError(null);
    const result = await signInWithOAuth(provider);
    if (result && !result.success) {
      setError(result.error);
    }
  }

  return (
    <main className="h-full w-full flex items-center justify-center bg-nolla-bg">
      <div className="glass-overlay w-full max-w-md px-8 py-10">
        <h1 className="text-2xl font-bold text-center text-nolla-text mb-8">
          Nolla
        </h1>

        {/* OAuth buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="touch-target w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[var(--color-parent-input-border)] bg-white text-nolla-text font-bold"
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("apple")}
            className="touch-target w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-black text-white font-bold"
          >
            Apple
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[var(--color-parent-card-border)]" />
          <span className="text-sm text-parent-tab-inactive">or</span>
          <div className="flex-1 h-px bg-[var(--color-parent-card-border)]" />
        </div>

        {/* Email form */}
        <form action={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="touch-target w-full px-4 py-3 rounded-xl border border-[var(--color-parent-input-border)] bg-[var(--color-parent-input-bg)] text-nolla-text"
          />
          <input
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Password"
            className="touch-target w-full px-4 py-3 rounded-xl border border-[var(--color-parent-input-border)] bg-[var(--color-parent-input-bg)] text-nolla-text"
          />

          {error && (
            <p className="text-sm text-[#B8906A] text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-mc w-full disabled:opacity-50"
          >
            {mode === "signup" ? "Create Account" : "Sign In"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            setError(null);
          }}
          className="mt-4 w-full text-center text-sm text-nolla-primary"
        >
          {mode === "signup"
            ? "Already have an account? Sign in"
            : "Need an account? Sign up"}
        </button>
      </div>
    </main>
  );
}

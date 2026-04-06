"use client";

import { signInWithEmail, signUpWithEmail, signInWithOAuth } from "@/lib/auth/actions";
import { useState } from "react";

type Mode = "signin" | "signup";

export default function OnboardingPage() {
  const [mode, setMode] = useState<Mode>("signup");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);
    setLoading(true);

    const result = mode === "signup"
      ? await signUpWithEmail(formData)
      : await signInWithEmail(formData);

    if (result && !result.success) {
      setError(result.error);
    } else if (result && result.success && mode === "signup") {
      setSuccess("Confirmation email sent. Check your inbox.");
    }
    setLoading(false);
  }

  async function handleOAuth(provider: "apple" | "google") {
    setError(null);
    setSuccess(null);
    const result = await signInWithOAuth(provider);
    if (result && !result.success) {
      setError(result.error);
    }
  }

  return (
    <main className="min-h-full w-full flex items-start justify-center bg-nolla-bg overflow-y-auto py-6">
      <div className="glass-overlay w-full max-w-md mx-4 px-6 py-8 sm:px-8 sm:py-10">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-nolla-text mb-6">
          Nolla
        </h1>

        {/* OAuth buttons — disabled until configured in Supabase dashboard */}
        <div className="flex flex-col gap-3 mb-5">
          <button
            type="button"
            disabled
            className="touch-target w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[var(--color-parent-input-border)] bg-white/50 text-parent-tab-inactive font-bold text-sm"
          >
            Google (coming soon)
          </button>
          <button
            type="button"
            disabled
            className="touch-target w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-black/30 text-white/50 font-bold text-sm"
          >
            Apple (coming soon)
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[var(--color-parent-card-border)]" />
          <span className="text-xs text-parent-tab-inactive">or</span>
          <div className="flex-1 h-px bg-[var(--color-parent-card-border)]" />
        </div>

        {/* Email form */}
        <form action={handleSubmit} className="flex flex-col gap-3">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="touch-target w-full px-4 py-3 rounded-xl border border-[var(--color-parent-input-border)] bg-[var(--color-parent-input-bg)] text-nolla-text text-sm"
          />
          <input
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Password (8+)"
            className="touch-target w-full px-4 py-3 rounded-xl border border-[var(--color-parent-input-border)] bg-[var(--color-parent-input-bg)] text-nolla-text text-sm"
          />

          {error && (
            <p className="text-sm text-[#B8906A] text-center">{error}</p>
          )}
          {success && (
            <p className="text-sm text-nolla-secondary text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-mc w-full disabled:opacity-50 text-sm"
          >
            {loading ? "..." : mode === "signup" ? "Create Account" : "Sign In"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            setError(null);
            setSuccess(null);
          }}
          className="mt-3 w-full text-center text-xs text-nolla-primary"
        >
          {mode === "signup"
            ? "Already have an account? Sign in"
            : "Need an account? Sign up"}
        </button>
      </div>
    </main>
  );
}

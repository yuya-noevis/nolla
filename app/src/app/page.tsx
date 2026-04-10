"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2400);
    const navTimer = setTimeout(() => router.replace("/onboarding"), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [router]);

  return (
    <main
      className={`h-full w-full flex flex-col items-center justify-center transition-opacity duration-600 ${fadeOut ? "opacity-0" : "opacity-100"}`}
      style={{ background: "radial-gradient(ellipse at 50% 40%, #1E1550 0%, #0B0B30 70%, #0A0A2E 100%)" }}
    >
      {/* Logo */}
      <div className="animate-splash-in flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-3xl bg-white/90 shadow-elevated flex items-center justify-center">
          <span className="text-4xl font-bold text-nolla-primary">N</span>
        </div>
        <h1 className="text-3xl font-bold text-white drop-shadow-md">
          Nolla
        </h1>
      </div>
    </main>
  );
}

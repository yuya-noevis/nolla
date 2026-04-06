"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook to detect online/offline status.
 * Returns { isOffline, wasOffline } for UI and sync decisions.
 */
export function useOffline() {
  const [isOffline, setIsOffline] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  const handleOnline = useCallback(() => {
    setIsOffline(false);
    // wasOffline stays true until explicitly cleared
  }, []);

  const handleOffline = useCallback(() => {
    setIsOffline(true);
    setWasOffline(true);
  }, []);

  const clearWasOffline = useCallback(() => {
    setWasOffline(false);
  }, []);

  useEffect(() => {
    // Check initial state
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setIsOffline(true);
      setWasOffline(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return { isOffline, wasOffline, clearWasOffline } as const;
}

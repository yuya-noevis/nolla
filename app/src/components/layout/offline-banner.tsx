"use client";

import { useOffline } from "@/hooks/use-offline";

/**
 * Shows a banner when the device is offline.
 * Uses .offline-banner class from globals.css.
 */
export function OfflineBanner() {
  const { isOffline } = useOffline();

  if (!isOffline) return null;

  return (
    <div className="offline-banner" role="status" aria-live="polite">
      オフラインです — データは復帰後に同期されます
    </div>
  );
}

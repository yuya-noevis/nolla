/**
 * LocalStorage-based offline persistence.
 * Stores queue items in localStorage for survival across page reloads.
 */
import type { OfflineQueue, QueueItem } from "./queue";
import { createQueue } from "./queue";

const STORAGE_KEY = "nolla_offline_queue";

export function saveQueue(queue: OfflineQueue): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue.items));
}

export function loadQueue(): OfflineQueue {
  if (typeof localStorage === "undefined") return createQueue();

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return createQueue();

  try {
    const items: readonly QueueItem[] = JSON.parse(raw);
    return { items };
  } catch {
    return createQueue();
  }
}

export function clearQueue(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

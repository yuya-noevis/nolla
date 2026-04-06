/**
 * Client-side persistence wrapper.
 * Online: calls server actions directly.
 * Offline: queues to localStorage for later sync.
 */
import { enqueue } from "./queue";
import { loadQueue, saveQueue } from "./storage";

export function queueForSync(
  table: string,
  data: Record<string, unknown>
): void {
  const queue = loadQueue();
  const updated = enqueue(queue, {
    type: table,
    payload: data,
    timestamp: new Date().toISOString(),
  });
  saveQueue(updated);
}

export function isOnline(): boolean {
  return typeof navigator !== "undefined" ? navigator.onLine : true;
}

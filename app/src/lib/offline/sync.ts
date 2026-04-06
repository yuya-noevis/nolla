/**
 * Offline sync — flush queued records to Supabase when online.
 */
import { loadQueue, saveQueue, clearQueue } from "./storage";
import { dequeue } from "./queue";
import type { OfflineQueue, QueueItem } from "./queue";
import { createBrowserClient } from "@supabase/ssr";

type SyncResult = {
  readonly synced: number;
  readonly failed: number;
};

export async function syncPendingRecords(): Promise<SyncResult> {
  let queue = loadQueue();
  if (queue.items.length === 0) return { synced: 0, failed: 0 };

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  let synced = 0;
  let failed = 0;

  while (queue.items.length > 0) {
    const [item, rest] = dequeue(queue);
    if (!item) break;

    const success = await writeItem(supabase, item);
    if (success) {
      synced += 1;
      queue = rest;
    } else {
      failed += 1;
      // Keep failed item in queue for next retry
      break;
    }
  }

  if (queue.items.length === 0) {
    clearQueue();
  } else {
    saveQueue(queue);
  }

  return { synced, failed };
}

async function writeItem(
  supabase: ReturnType<typeof createBrowserClient>,
  item: QueueItem
): Promise<boolean> {
  const { type, payload } = item;

  const { error } = await supabase.from(type).insert(payload);
  return !error;
}

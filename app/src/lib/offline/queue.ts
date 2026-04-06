/**
 * Immutable offline queue for pending writes.
 * Stores operations to sync when connectivity returns.
 * Pure functions — no side effects.
 */

export type QueueItem = {
  readonly type: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly timestamp: string;
};

export type OfflineQueue = {
  readonly items: readonly QueueItem[];
};

export function createQueue(): OfflineQueue {
  return { items: [] };
}

export function enqueue(
  queue: OfflineQueue,
  item: QueueItem
): OfflineQueue {
  return { items: [...queue.items, item] };
}

export function dequeue(
  queue: OfflineQueue
): [QueueItem | null, OfflineQueue] {
  if (queue.items.length === 0) {
    return [null, queue];
  }
  const [first, ...rest] = queue.items;
  return [first, { items: rest }];
}

export function peekAll(queue: OfflineQueue): readonly QueueItem[] {
  return queue.items;
}

export function queueSize(queue: OfflineQueue): number {
  return queue.items.length;
}

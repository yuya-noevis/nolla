/**
 * Offline queue tests — TDD
 * Pure functions for queuing/dequeuing pending writes.
 */
import { describe, it, expect, beforeEach } from "vitest";
import {
  createQueue,
  enqueue,
  dequeue,
  peekAll,
  queueSize,
} from "@/lib/offline/queue";

describe("offline queue", () => {
  it("createQueue returns empty queue", () => {
    const q = createQueue();
    expect(queueSize(q)).toBe(0);
    expect(peekAll(q)).toEqual([]);
  });

  it("enqueue adds an item", () => {
    const q = createQueue();
    const q2 = enqueue(q, {
      type: "trial",
      payload: { correct: true, rt: 800 },
      timestamp: "2026-04-06T12:00:00Z",
    });
    expect(queueSize(q2)).toBe(1);
    expect(queueSize(q)).toBe(0); // original unchanged
  });

  it("dequeue removes first item", () => {
    let q = createQueue();
    q = enqueue(q, {
      type: "trial",
      payload: { id: 1 },
      timestamp: "2026-04-06T12:00:00Z",
    });
    q = enqueue(q, {
      type: "session",
      payload: { id: 2 },
      timestamp: "2026-04-06T12:01:00Z",
    });

    const [item, q2] = dequeue(q);
    expect(item?.type).toBe("trial");
    expect(queueSize(q2)).toBe(1);
    expect(queueSize(q)).toBe(2); // original unchanged
  });

  it("dequeue on empty returns null and same queue", () => {
    const q = createQueue();
    const [item, q2] = dequeue(q);
    expect(item).toBeNull();
    expect(queueSize(q2)).toBe(0);
  });

  it("peekAll returns all items in order", () => {
    let q = createQueue();
    q = enqueue(q, {
      type: "a",
      payload: {},
      timestamp: "2026-04-06T12:00:00Z",
    });
    q = enqueue(q, {
      type: "b",
      payload: {},
      timestamp: "2026-04-06T12:01:00Z",
    });
    q = enqueue(q, {
      type: "c",
      payload: {},
      timestamp: "2026-04-06T12:02:00Z",
    });

    const all = peekAll(q);
    expect(all.map((i) => i.type)).toEqual(["a", "b", "c"]);
  });

  it("maintains immutability across operations", () => {
    const q1 = createQueue();
    const q2 = enqueue(q1, {
      type: "x",
      payload: {},
      timestamp: "2026-04-06T12:00:00Z",
    });
    const q3 = enqueue(q2, {
      type: "y",
      payload: {},
      timestamp: "2026-04-06T12:01:00Z",
    });

    expect(queueSize(q1)).toBe(0);
    expect(queueSize(q2)).toBe(1);
    expect(queueSize(q3)).toBe(2);
  });
});

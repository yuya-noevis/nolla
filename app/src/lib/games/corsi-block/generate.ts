/**
 * Corsi Block layout generation.
 * Based on: outputs/nolla_game_mechanics_design.md Section 2.4
 *
 * - Irregular block placement
 * - Min distance between blocks = blockSize * 1.5
 * - No consecutive same block in sequence
 */
import type { CorsiBlockParams, CorsiLayout, CorsiBlock } from "@/types/domain";

const AREA_WIDTH = 800;
const AREA_HEIGHT = 500;

function getBlockSize(totalBlocks: number): number {
  // Larger blocks for fewer blocks, smaller for more
  if (totalBlocks <= 6) return 96;
  if (totalBlocks <= 9) return 80;
  if (totalBlocks <= 12) return 72;
  return 64;
}

function generateBlockPositions(
  count: number,
  blockSize: number
): readonly CorsiBlock[] {
  const minDist = blockSize * 1.5;
  const padding = blockSize;
  const blocks: CorsiBlock[] = [];

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let x: number;
    let y: number;
    do {
      x = padding + Math.random() * (AREA_WIDTH - 2 * padding);
      y = padding + Math.random() * (AREA_HEIGHT - 2 * padding);
      attempts++;
    } while (
      attempts < 200 &&
      blocks.some((b) => {
        const dx = b.x - x;
        const dy = b.y - y;
        return Math.sqrt(dx * dx + dy * dy) < minDist;
      })
    );

    blocks.push({
      id: i,
      x: Math.round(x),
      y: Math.round(y),
    });
  }

  return blocks;
}

function generateSequence(
  blockCount: number,
  seqLength: number
): readonly number[] {
  const sequence: number[] = [];

  for (let i = 0; i < seqLength; i++) {
    let nextId: number;
    do {
      nextId = Math.floor(Math.random() * blockCount);
    } while (sequence.length > 0 && nextId === sequence[sequence.length - 1]);
    sequence.push(nextId);
  }

  return sequence;
}

export function generateCorsiLayout(
  params: CorsiBlockParams
): CorsiLayout {
  const blockSize = getBlockSize(params.blocks);
  const blocks = generateBlockPositions(params.blocks, blockSize);
  const sequence = generateSequence(params.blocks, params.seqLength);

  return { blocks, sequence, blockSize };
}

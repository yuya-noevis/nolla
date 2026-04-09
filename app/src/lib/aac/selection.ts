import {
  AAC_MINI_VOCABULARY,
  AAC_MINI_CATEGORIES,
  type AacCategory,
  type AacMiniVocabulary,
  type AacMiniCategory,
} from './vocabulary';

/**
 * Get all vocabulary items for a specific category
 */
export function getVocabularyByCategory(
  category: AacCategory,
): AacMiniVocabulary[] {
  const filtered = AAC_MINI_VOCABULARY.filter((v) => v.category === category);
  // Return immutable copy
  return JSON.parse(JSON.stringify(filtered));
}

/**
 * Get a single vocabulary item by ID
 */
export function getVocabularyById(id: number): AacMiniVocabulary | undefined {
  const vocab = AAC_MINI_VOCABULARY.find((v) => v.id === id);
  if (!vocab) {
    return undefined;
  }
  // Return immutable copy
  return JSON.parse(JSON.stringify(vocab));
}

/**
 * Get all categories with their metadata
 */
export function getAllCategories(): AacMiniCategory[] {
  // Return immutable copy
  return JSON.parse(JSON.stringify(AAC_MINI_CATEGORIES));
}

/**
 * Get the count of vocabulary items in a category
 */
export function getVocabularyCountByCategory(category: AacCategory): number {
  const count = AAC_MINI_VOCABULARY.filter(
    (v) => v.category === category,
  ).length;
  return count;
}

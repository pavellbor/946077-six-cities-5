export function generateRandomValue(
  min: number,
  max: number,
  numAfterDigit = 0
): number {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function shuffleItems<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function getRandomItems<T>(items: T[], count = 0): T[] {
  if (items.length < count) {
    throw new Error('Parameter "count" is less than the length of the array');
  }

  items = shuffleItems(items);

  const startPosition = generateRandomValue(0, items.length - 1 - count);
  const endPosition = count
    ? startPosition + count
    : generateRandomValue(startPosition + 1, items.length);

  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "";
}

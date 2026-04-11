export type FloorKey = 't' | 'm' | 'd';
export type ItemCode = 'r' | 'b' | 'g' | 'ri' | 'bi' | 'gi';

export type BoardFloors = Record<FloorKey, ItemCode[]>;

/**
 * Parses a board string into items grouped by floor.
 *
 * Floor indicators: 't' (top), 'm' (middle), 'd' (bottom/table)
 * Item codes: 'r' (potionRed), 'b' (potionBlue), 'g' (potionGreen),
 *             'ri' (potionRedTag), 'bi' (potionBlueTag), 'gi' (potionGreenTag)
 *
 * Example: 'tbridgi' → top: ['b', 'ri'], middle: [], bottom: ['gi']
 */
export function parseBoardString(board: string): BoardFloors {
  const floors: BoardFloors = { t: [], m: [], d: [] };
  let currentFloor: FloorKey | null = null;
  let i = 0;

  while (i < board.length) {
    const char = board[i];

    if (char === 't' || char === 'm' || char === 'd') {
      currentFloor = char;
      i++;
    } else if ((char === 'r' || char === 'b' || char === 'g') && currentFloor) {
      if (board[i + 1] === 'i') {
        floors[currentFloor].push((char + 'i') as ItemCode);
        i += 2;
      } else {
        floors[currentFloor].push(char as ItemCode);
        i++;
      }
    } else {
      i++;
    }
  }

  return floors;
}

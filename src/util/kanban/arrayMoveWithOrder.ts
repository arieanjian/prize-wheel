// 樂觀更新
export default function arrayMoveWithOrder<T extends { order: number }>(
  arr: T[],
  from: number,
  to: number
): T[] {
  // 如果 from 和 to 相等，則保持原始陣列不變
  if (from === to) return arr;
  // 如果 from 或 to 小於 0，則保持原始陣列不變
  if (from < 0 || to < 0) return arr;
  // 如果 from 或 to 超出陣列範圍，則保持原始陣列不變
  if (from >= arr.length || to >= arr.length) return arr;

  const newArray = arr.slice();
  // 交換順序
  newArray[from] = arr[to];
  // 交換順序
  newArray[to] = arr[from];
  // 因為是樂觀更新，所以要更新 order
  newArray[from].order = from;
  // 因為是樂觀更新，所以要更新 order
  newArray[to].order = to;
  return newArray;
}

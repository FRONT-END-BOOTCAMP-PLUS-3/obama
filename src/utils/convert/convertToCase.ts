export function toCamelCase<T extends object | null | undefined>(obj: T): T | null {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    const convertedArray = obj.map(toCamelCase).filter(item => item !== null && item !== undefined);
    return convertedArray.length > 0 ? (convertedArray as unknown as T) : null;
  }

  const newObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof key !== "string") continue;
    const camelKey = key.replace(/[_-](\w)/g, (_, letter) => letter.toUpperCase());
    const convertedValue = toCamelCase(value);

    if (convertedValue !== null && convertedValue !== undefined) {
      newObj[camelKey] = convertedValue;
    }
  }

  return Object.keys(newObj).length > 0 ? (newObj as T) : null; // 🚀 빈 객체 `{}` 대신 `null` 반환!
}

export function toSnakeCase<T extends object | null | undefined>(obj: T): T | null {
  if (!obj || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    const convertedArray = obj.map(toSnakeCase).filter(item => item !== null && item !== undefined);
    return convertedArray.length > 0 ? (convertedArray as unknown as T) : null;
  }

  const newObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof key !== "string") continue;
    const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    const convertedValue = toSnakeCase(value);

    if (convertedValue !== null && convertedValue !== undefined) {
      newObj[snakeKey] = convertedValue;
    }
  }

  return Object.keys(newObj).length > 0 ? (newObj as T) : null; // 🚀 빈 객체가 나오면 `null` 반환!
}
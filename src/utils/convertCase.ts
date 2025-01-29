export function toCamelCase<T extends object | null | undefined>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(toCamelCase) as unknown as T;
    } else if (obj === null || obj === undefined || typeof obj !== "object") {
        return obj;
    } else {
        const newObj: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj)) {
            const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
            newObj[camelKey] = toCamelCase(value);
        }
        return newObj as T;
    }
}

export function toSnakeCase<T extends object | null | undefined>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(toSnakeCase) as unknown as T;
    } else if (obj === null || obj === undefined || typeof obj !== "object") {
        return obj;
    } else {
        const newObj: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj)) {
            const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
            newObj[snakeKey] = toSnakeCase(value);
        }
        return newObj as T;
    }
}
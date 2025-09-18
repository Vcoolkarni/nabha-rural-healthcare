export const isBrowser = typeof window !== "undefined";

export function safeLocalStorage<T = unknown>(key: string, initial: T) {
  const get = (): T => {
    if (!isBrowser) return initial as T;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial as T;
    }
  };
  const set = (value: T) => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  };
  return { get, set };
}
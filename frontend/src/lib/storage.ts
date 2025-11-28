const isBrowser = typeof window !== 'undefined';

// Memory storage fallback
const memoryStorage: Record<string, string> = {};

export const storage = {
  getItem(key: string): string | null {
    if (!isBrowser) return null;
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return memoryStorage[key] || null;
    }
  },
  
  setItem(key: string, value: string): void {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      memoryStorage[key] = value;
    }
  },
  
  removeItem(key: string): void {
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      delete memoryStorage[key];
    }
  }
};

// Backward compatibility
export const safeStorage = storage;

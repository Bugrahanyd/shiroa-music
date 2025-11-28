const isBrowser = typeof window !== 'undefined';

// Memory storage fallback (persists during session)
const memoryStorage: Record<string, string> = {};

export const storage = {
  getItem(key: string): string | null {
    if (!isBrowser) return memoryStorage[key] || null;
    try {
      const value = window.localStorage.getItem(key);
      if (value) memoryStorage[key] = value;
      return value;
    } catch (e) {
      return memoryStorage[key] || null;
    }
  },
  
  setItem(key: string, value: string): void {
    memoryStorage[key] = value;
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      // Silent fail, already in memory
    }
  },
  
  removeItem(key: string): void {
    delete memoryStorage[key];
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      // Silent fail, already removed from memory
    }
  }
};

// Backward compatibility
export const safeStorage = storage;

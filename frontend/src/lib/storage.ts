// Safe Storage - Prevents crashes when localStorage is blocked
const isBrowser = typeof window !== 'undefined';

export const storage = {
  getItem(key: string): string | null {
    if (!isBrowser) return null;
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn(`Storage access denied for key: ${key}`);
      return null;
    }
  },
  
  setItem(key: string, value: string): void {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`Storage write denied for key: ${key}`);
    }
  },
  
  removeItem(key: string): void {
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Storage remove denied for key: ${key}`);
    }
  }
};

// Backward compatibility
export const safeStorage = storage;

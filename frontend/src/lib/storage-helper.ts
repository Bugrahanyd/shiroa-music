// Safe Storage Helper - Prevents crashes when localStorage is blocked
const isBrowser = typeof window !== 'undefined';

export const safeStorage = {
  getItem: (key: string): string | null => {
    if (!isBrowser) return null;
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('Storage access blocked:', e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('Storage access blocked:', e);
    }
  },
  removeItem: (key: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Storage access blocked:', e);
    }
  },
  clear: (): void => {
    if (!isBrowser) return;
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('Storage access blocked:', e);
    }
  }
};

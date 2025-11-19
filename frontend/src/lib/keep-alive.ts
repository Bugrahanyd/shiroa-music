// Keep backend alive by pinging every 10 minutes
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://shiroa-music.onrender.com';

export function startKeepAlive() {
  if (typeof window === 'undefined') return;

  setInterval(async () => {
    try {
      await fetch(`${BACKEND_URL}/health`, { method: 'GET' });
      console.log('Backend keep-alive ping');
    } catch (error) {
      console.error('Keep-alive failed:', error);
    }
  }, 10 * 60 * 1000); // 10 minutes
}

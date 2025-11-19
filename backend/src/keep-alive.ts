import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'https://shiroa-music.onrender.com';

// Ping backend every 10 minutes to keep it alive
setInterval(async () => {
  try {
    await axios.get(`${BACKEND_URL}/health`);
    console.log('Keep-alive ping successful');
  } catch (error) {
    console.error('Keep-alive ping failed:', error.message);
  }
}, 10 * 60 * 1000); // 10 minutes

export default {};

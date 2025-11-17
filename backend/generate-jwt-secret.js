const crypto = require('crypto');

// Güçlü JWT secret üret
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log('🔐 Güçlü JWT Secret:');
console.log(jwtSecret);
console.log('\n📝 .env dosyanıza ekleyin:');
console.log(`JWT_SECRET=${jwtSecret}`);
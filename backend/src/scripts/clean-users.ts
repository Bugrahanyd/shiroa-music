import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb://shiroa_user:change_me_in_production@localhost:27017/shiroa?authSource=admin';

async function cleanUsers() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    
    // Delete all users except admin@shiroa.com and johndoe@shiroa.com
    const result = await db.collection('users').deleteMany({
      email: { $nin: ['admin@shiroa.com', 'johndoe@shiroa.com'] }
    });

    console.log(`Deleted ${result.deletedCount} users`);
    console.log('Kept: admin@shiroa.com and johndoe@shiroa.com');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

cleanUsers();

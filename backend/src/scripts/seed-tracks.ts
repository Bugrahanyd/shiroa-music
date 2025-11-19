import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const trackSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  bpm: Number,
  duration: Number,
  price: Number,
  audioUrl: String,
  coverUrl: String,
  description: String,
  tags: [String],
  isAvailable: Boolean,
}, { timestamps: true });

const Track = mongoose.model('Track', trackSchema);

async function bootstrap() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in .env file');
    }
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

  const sampleTracks = [
    // Arabesk Pop
    {
      title: 'Aşkın İzleri',
      artist: 'HYDRABON',
      genre: 'Arabesk Pop',
      bpm: 95,
      duration: 180,
      price: 49.99,
      audioUrl: '/tracks/Arabesk Pop/Aşkın İzleri.wav',
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
      description: 'Modern arabesk pop with emotional depth',
      tags: ['arabesk', 'pop', 'turkish'],
      isAvailable: true,
    },
    {
      title: 'Kalbimde İz Bırak',
      artist: 'HYDRABON',
      genre: 'Arabesk Pop',
      bpm: 90,
      duration: 200,
      price: 54.99,
      audioUrl: '/tracks/Arabesk Pop/Kalbimde İz Bırak.wav',
      coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500',
      description: 'Heartfelt arabesk pop ballad',
      tags: ['arabesk', 'pop', 'ballad'],
      isAvailable: true,
    },
    // Arabesk Rap
    {
      title: 'Bıraktın Yalnızlığa',
      artist: 'HYDRABON',
      genre: 'Arabesk Rap',
      bpm: 85,
      duration: 190,
      price: 59.99,
      audioUrl: '/tracks/Arabesk Rap/Bıraktın Yalnızlığa.wav',
      coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
      description: 'Emotional arabesk rap fusion',
      tags: ['arabesk', 'rap', 'emotional'],
      isAvailable: true,
    },
    {
      title: 'Dokunamam',
      artist: 'HYDRABON',
      genre: 'Arabesk Rap',
      bpm: 88,
      duration: 185,
      price: 59.99,
      audioUrl: '/tracks/Arabesk Rap/Dokunamam.wav',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
      description: 'Deep arabesk rap with powerful lyrics',
      tags: ['arabesk', 'rap', 'deep'],
      isAvailable: true,
    },
    {
      title: 'Gece Boyunca',
      artist: 'HYDRABON',
      genre: 'Arabesk Rap',
      bpm: 92,
      duration: 195,
      price: 64.99,
      audioUrl: '/tracks/Arabesk Rap/Gece Boyunca.wav',
      coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500',
      description: 'Night-themed arabesk rap',
      tags: ['arabesk', 'rap', 'night'],
      isAvailable: true,
    },
    // Electronic
    {
      title: 'Inferno Circuit',
      artist: 'Fatih',
      genre: 'Electronic',
      bpm: 128,
      duration: 210,
      price: 69.99,
      audioUrl: '/tracks/Fatih/Inferno Circuit.wav',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
      description: 'High-energy electronic inferno',
      tags: ['electronic', 'energetic', 'intense'],
      isAvailable: true,
    },
    {
      title: 'Instrumental Inferno',
      artist: 'Fatih',
      genre: 'Electronic',
      bpm: 130,
      duration: 205,
      price: 69.99,
      audioUrl: '/tracks/Fatih/Instrumental Inferno.wav',
      coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
      description: 'Pure instrumental electronic fire',
      tags: ['electronic', 'instrumental', 'fire'],
      isAvailable: true,
    },
    // English
    {
      title: 'Echoes of Tomorrow',
      artist: 'HYDRABON',
      genre: 'Ambient',
      bpm: 75,
      duration: 220,
      price: 54.99,
      audioUrl: '/tracks/İngilizce/Echoes of Tomorrow.wav',
      coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500',
      description: 'Atmospheric ambient journey',
      tags: ['ambient', 'atmospheric', 'chill'],
      isAvailable: true,
    },
    {
      title: 'Whispers in the Ashes',
      artist: 'HYDRABON',
      genre: 'Ambient',
      bpm: 70,
      duration: 230,
      price: 54.99,
      audioUrl: '/tracks/İngilizce/Whispers in the Ashes.wav',
      coverUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500',
      description: 'Haunting ambient soundscape',
      tags: ['ambient', 'dark', 'atmospheric'],
      isAvailable: true,
    },
    // Zirzop
    {
      title: 'Çalkala',
      artist: 'Zirzop',
      genre: 'Experimental',
      bpm: 140,
      duration: 175,
      price: 44.99,
      audioUrl: '/tracks/Zirzop/Çalkala.wav',
      coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500',
      description: 'Experimental Turkish hip-hop',
      tags: ['experimental', 'hip-hop', 'turkish'],
      isAvailable: true,
    },
    {
      title: 'KAOS',
      artist: 'Zirzop',
      genre: 'Experimental',
      bpm: 145,
      duration: 165,
      price: 44.99,
      audioUrl: '/tracks/Zirzop/KAOS.wav',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
      description: 'Chaotic experimental beats',
      tags: ['experimental', 'chaos', 'intense'],
      isAvailable: true,
    },
    {
      title: 'PAPAPAPA',
      artist: 'Zirzop',
      genre: 'Experimental',
      bpm: 150,
      duration: 160,
      price: 39.99,
      audioUrl: '/tracks/Zirzop/PAPAPAPA.wav',
      coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
      description: 'High-energy experimental track',
      tags: ['experimental', 'energetic', 'unique'],
      isAvailable: true,
    },
  ];

    await Track.deleteMany({});
    await Track.insertMany(sampleTracks);
    console.log('✅ Sample tracks seeded successfully!');
    console.log(`📊 Total tracks: ${sampleTracks.length}`);
  } catch (error) {
    console.error('❌ Error seeding tracks:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

bootstrap();

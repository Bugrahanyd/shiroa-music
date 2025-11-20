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
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643198/A%C5%9Fk%C4%B1n_%C4%B0zleri_l7akjc.wav',
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
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643141/Kalbimde_%C4%B0z_B%C4%B1rak_bqkdka.wav',
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
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643072/B%C4%B1rakt%C4%B1n_Yaln%C4%B1zl%C4%B1%C4%9Fa_yusand.wav',
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
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643127/Dokunamam_ffqoty.wav',
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
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643140/Gece_Boyunca_y5f4tz.wav',
      coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500',
      description: 'Night-themed arabesk rap',
      tags: ['arabesk', 'rap', 'night'],
      isAvailable: true,
    },
    {
      title: 'Senden Yoksun',
      artist: 'HYDRABON',
      genre: 'Arabesk Rap',
      bpm: 90,
      duration: 185,
      price: 59.99,
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643062/Senden_Yoksun_uoec8r.wav',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
      description: 'Melancholic arabesk rap',
      tags: ['arabesk', 'rap', 'sad'],
      isAvailable: true,
    },
    {
      title: 'Kaybolmuş Kalbim',
      artist: 'HYDRABON',
      genre: 'Arabesk Rap',
      bpm: 87,
      duration: 190,
      price: 59.99,
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643056/Kaybolmu%C5%9F_Kalbim_b7nhsm.wav',
      coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
      description: 'Lost heart arabesk rap',
      tags: ['arabesk', 'rap', 'emotional'],
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
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643068/Inferno_Circuit_ecdjhs.wav',
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
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643095/Instrumental_Inferno_zzvawt.wav',
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
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643217/Echoes_of_Tomorrow_ulhizs.wav',
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
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643214/Whispers_in_the_Ashes_qhryfk.wav',
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
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643074/%C3%87alkala_ruldvf.wav',
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
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643023/KAOS_bleor3.wav',
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
      audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643001/PAPAPAPA_mu9ahw.wav',
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

import { NextResponse } from 'next/server';

const DEMO_TRACKS = [
  { _id: 'track_001', title: 'Neon Nights', artist: 'Cyber Dreams', genre: 'Electronic', bpm: 128, duration: '4:32', price: 89, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', coverUrl: '/cyber.jpg', tags: ['synthwave', 'neon', 'electronic'], isExclusive: true, createdAt: '2024-01-20', status: 'available' },
  { _id: 'track_002', title: 'Urban Flow', artist: 'Street Beats', genre: 'Hip Hop', bpm: 95, duration: '3:45', price: 65, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', coverUrl: '/logo.png', tags: ['urban', 'flow', 'beats'], isExclusive: true, createdAt: '2024-01-19', status: 'available' },
  { _id: 'track_003', title: 'Midnight Jazz', artist: 'Smooth Operator', genre: 'Jazz', bpm: 110, duration: '5:12', price: 75, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', coverUrl: '/pembe.jpg', tags: ['jazz', 'smooth', 'midnight'], isExclusive: true, createdAt: '2024-01-18', status: 'available' },
  { _id: 'track_004', title: 'Rock Anthem', artist: 'Electric Storm', genre: 'Rock', bpm: 140, duration: '4:18', price: 55, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', coverUrl: '/turuncu.jpg', tags: ['rock', 'anthem', 'electric'], isExclusive: true, createdAt: '2024-01-17', status: 'available' },
  { _id: 'track_005', title: 'Pop Dreams', artist: 'Melody Maker', genre: 'Pop', bpm: 120, duration: '3:28', price: 45, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', coverUrl: '/gri.jpg', tags: ['pop', 'dreams', 'catchy'], isExclusive: true, createdAt: '2024-01-16', status: 'available' }
];

export async function GET() {
  return NextResponse.json({ tracks: DEMO_TRACKS });
}

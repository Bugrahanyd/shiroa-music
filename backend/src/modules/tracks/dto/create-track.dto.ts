export class CreateTrackDto {
  title: string;
  artist: string;
  genre: string;
  mood?: string;
  bpm?: number;
  key?: string;
  duration: number;
  price: number;
  audioUrl: string;
  previewUrl: string;
  coverUrl?: string;
  tags?: string[];
  isExclusive?: boolean;
}

export class UpdateTrackDto {
  title?: string;
  artist?: string;
  genre?: string;
  mood?: string;
  bpm?: number;
  key?: string;
  duration?: number;
  price?: number;
  coverUrl?: string;
  tags?: string[];
  isExclusive?: boolean;
}

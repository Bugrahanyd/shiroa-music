import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, Min, Max } from "class-validator";

export class CreateTrackDto {
  @IsString()
  title: string;

  @IsString()
  artist: string;

  @IsString()
  genre: string;

  @IsOptional()
  @IsString()
  mood?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(300)
  bpm?: number;

  @IsOptional()
  @IsString()
  key?: string;

  @IsNumber()
  @Min(1)
  duration: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  audioUrl: string;

  @IsString()
  previewUrl: string;

  @IsOptional()
  @IsString()
  coverUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  isExclusive?: boolean;
}

import { IsString, IsNumber, IsOptional, IsArray, IsEnum, IsObject, Min, Max } from "class-validator";
import { LicenseType } from "../track.entity";

export class CreateTrackDto {
  @IsString()
  title: string;

  @IsString()
  artist: string;

  @IsString()
  genre: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subgenres?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mood?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  instruments?: string[];

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  lyrics?: string;

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
  @IsEnum(LicenseType)
  licenseType?: LicenseType;

  @IsOptional()
  @IsString()
  aiProfileId?: string;

  @IsOptional()
  @IsObject()
  meta?: {
    tempoConfidence?: number;
    loudness?: number;
    stemsCount?: number;
    aiGenerated?: boolean;
  };

  @IsOptional()
  @IsObject()
  formats?: {
    master?: string;
    stream320?: string;
    preview30?: string;
  };
}

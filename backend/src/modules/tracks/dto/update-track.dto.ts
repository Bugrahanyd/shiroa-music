import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, Min, Max } from "class-validator";

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  artist?: string;

  @IsOptional()
  @IsString()
  genre?: string;

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

  @IsOptional()
  @IsNumber()
  @Min(1)
  duration?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

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

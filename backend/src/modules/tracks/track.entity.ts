import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum TrackStatus {
  AVAILABLE = "available",
  RESERVED = "reserved",
  SOLD = "sold"
}

export enum LicenseType {
  EXCLUSIVE = "exclusive",
  NON_EXCLUSIVE = "non-exclusive"
}

@Schema({ timestamps: true })
export class Track extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ type: [String], default: [] })
  subgenres: string[];

  @Prop({ type: [String], default: [] })
  mood: string[];

  @Prop({ type: [String], default: [] })
  instruments: string[];

  @Prop()
  language?: string;

  @Prop()
  lyrics?: string;

  @Prop()
  bpm?: number;

  @Prop()
  key?: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  audioUrl: string;

  @Prop({ required: true })
  previewUrl: string;

  @Prop()
  coverUrl?: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: String, enum: LicenseType, default: LicenseType.EXCLUSIVE })
  licenseType: LicenseType;

  @Prop({ type: String, enum: TrackStatus, default: TrackStatus.AVAILABLE })
  status: TrackStatus;

  @Prop()
  aiProfileId?: string;

  @Prop({ type: Object })
  meta?: {
    tempoConfidence?: number;
    loudness?: number;
    stemsCount?: number;
    aiGenerated?: boolean;
  };

  @Prop({ type: Object })
  formats?: {
    master?: string;
    stream320?: string;
    preview30?: string;
  };

  @Prop({ default: false })
  isSold: boolean;
}

export const TrackSchema = SchemaFactory.createForClass(Track);

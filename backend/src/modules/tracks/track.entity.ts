import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Track extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ required: true })
  genre: string;

  @Prop()
  mood?: string;

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

  @Prop({ default: true })
  isExclusive: boolean;

  @Prop({ default: false })
  isSold: boolean;
}

export const TrackSchema = SchemaFactory.createForClass(Track);

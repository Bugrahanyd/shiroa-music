import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Download extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  trackId: string;

  @Prop({ required: true })
  timestamp: Date;
}

export const DownloadSchema = SchemaFactory.createForClass(Download);

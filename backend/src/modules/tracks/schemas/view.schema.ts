import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class View extends Document {
  @Prop({ required: true })
  trackId: string;

  @Prop()
  userId: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop()
  ipAddress: string;
}

export const ViewSchema = SchemaFactory.createForClass(View);

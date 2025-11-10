import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export enum AnalyticsEventType {
  TRACK_VIEW = "track_view",
  TRACK_PLAY = "track_play",
  TRACK_PURCHASE = "track_purchase"
}

@Schema({ timestamps: true })
export class Analytics extends Document {
  @Prop({ type: Types.ObjectId, ref: "Track", required: true })
  trackId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "User" })
  userId?: Types.ObjectId;

  @Prop({ type: String, enum: AnalyticsEventType, required: true })
  eventType: AnalyticsEventType;

  @Prop()
  ipAddress?: string;

  @Prop()
  userAgent?: string;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);

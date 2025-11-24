import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  PRODUCER = "producer",
  ARTIST = "artist",
  LISTENER = "listener"
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ required: false })
  bio?: string;

  @Prop({ required: false })
  location?: string;

  @Prop({ type: Object, required: false })
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    spotify?: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

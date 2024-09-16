import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  is_admin: boolean;

  @Prop({ type: String })
  verificationCode: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  googleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

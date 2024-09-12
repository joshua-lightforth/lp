import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum AuthProvider {
  GOOGLE = 'google',
  LINKEDIN = 'linkedin',
  EMAIL = 'email',
}

@Schema()
export class User extends Document {
  @Prop()
  socialName?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ enum: AuthProvider, default: AuthProvider.EMAIL })
  provider?: AuthProvider;

  @Prop()
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

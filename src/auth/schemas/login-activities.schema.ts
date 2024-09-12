import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AuthProvider } from './user.schema';

@Schema()
export class LoginActivity extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop()
  ipAddress?: string;

  @Prop()
  userAgent?: string;

  @Prop({ enum: AuthProvider, default: AuthProvider.EMAIL })
  provider: AuthProvider;

  @Prop({ default: false })
  successful: boolean;
}

export const LoginActivitySchema = SchemaFactory.createForClass(LoginActivity);

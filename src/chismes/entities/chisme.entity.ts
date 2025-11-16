import {
  CATEGORIES,
  type Category,
} from '#chismes/interfaces/chisme.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChismeDocument = HydratedDocument<Chisme>;

@Schema()
export class Chisme {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, enum: CATEGORIES })
  category: Category;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ChismeSchema = SchemaFactory.createForClass(Chisme);

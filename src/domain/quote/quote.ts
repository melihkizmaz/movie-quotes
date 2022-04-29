import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Quote {
  @Field(() => ID)
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  @Field(() => String)
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Movie' })
  @Field(() => String)
  movie: Types.ObjectId;

  @Prop({ type: String, required: true })
  @Field(() => String)
  quote: string;

  @Prop({ type: Number })
  @Field(() => Number)
  time?: number;
}

export type QuoteDocument = Document & Quote;
export const QuoteSchema = SchemaFactory.createForClass(Quote);

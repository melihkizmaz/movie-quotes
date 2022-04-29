import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class Favorite {
  @Field(() => ID)
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  @Field(() => ID)
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Movie' })
  @Field(() => ID)
  movie: Types.ObjectId;
}

export type FavoriteDocument = Document & Favorite;
export const FavoriteSchema = SchemaFactory.createForClass(Favorite);

FavoriteSchema.index({ user: 1, movie: 1 }, { unique: true });

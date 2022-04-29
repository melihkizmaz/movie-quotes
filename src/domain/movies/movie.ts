import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Movie {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Prop({ type: Number, required: true })
  @Field(() => Number)
  movieId: number;

  @Prop({ type: String, required: true })
  @Field(() => String)
  title: string;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  description: string | null;

  @Prop({ type: Number, required: true })
  @Field(() => Number)
  rating: number;

  @Prop({ type: [String], required: true })
  @Field(() => [String])
  videoUrls: string[];

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  imageUrl: string | null;

  @Prop({ type: Boolean, required: true })
  @Field(() => Boolean)
  adult: boolean;

  @Prop({ type: String, required: true })
  @Field(() => String)
  language: string;

  @Prop({ type: Number, nullable: true })
  @Field(() => Number, { nullable: true })
  time: number | null;

  @Prop({ type: String, nullable: true })
  @Field(() => String, { nullable: true })
  tagline: string | null;

  @Prop({ type: Boolean, required: true })
  @Field(() => Boolean)
  video: boolean;
}

export type MovieDocument = Document & Movie;
export const MovieSchema = SchemaFactory.createForClass(Movie);

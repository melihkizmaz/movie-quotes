import { Field, ID, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class QuoteCreateInput {
  @Field(() => ID)
  movie: Types.ObjectId;

  @Field(() => String)
  quote: string;

  @Field(() => Number)
  time: number;
}

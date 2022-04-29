import { Field, ObjectType } from '@nestjs/graphql';
import { Favorite } from '../../../domain/favorite/favorite';
import { Movie } from '../../../domain/movies/movie';

@ObjectType()
export class MostFavoritedResult extends Favorite {
  @Field(() => Number)
  count: number;

  @Field(() => [Movie], { nullable: true, defaultValue: [] })
  movieDetail?: Movie[];
}

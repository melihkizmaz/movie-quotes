import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Favorite } from '../../domain/favorite/favorite';
import { FavoriteRepository } from '../../domain/favorite/favorite.repository';
import { MovieRepository } from '../../domain/movies/movie.repository';
import { User } from '../../domain/user/user';
import { GqlAuthGuard } from '../../security/guards/graphql-auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { MostFavoritedResult } from '../../resolvers/favorite/dto/most-favorited.result';
import { Movie } from '../../domain/movies/movie';
import { Types } from 'mongoose';
import { QuoteRepository } from '../../domain/quote/quote.repository';
@Resolver()
export class FavoriteResolver {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly movieRepository: MovieRepository,
    private readonly quoteRepository: QuoteRepository,
  ) {}
  @Mutation(() => Favorite)
  @UseGuards(GqlAuthGuard)
  async createFavorite(
    @CurrentUser() user: User,
    @Args('movieId') movieId: string,
  ): Promise<Favorite> {
    const movie = await this.movieRepository.findOrCreateByMovieId(movieId);

    return await this.favoriteRepository.create({
      movie: movie._id,
      user: user._id,
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async removeFavorite(
    @CurrentUser() user: User,
    @Args('movieId') movieId: string,
  ): Promise<boolean> {
    const movie = await this.favoriteRepository.findOne({
      user: user._id,
      movie: new Types.ObjectId(movieId),
    });
    if (!movie) return false;
    const [deleted] = await Promise.all([
      this.favoriteRepository.deleteById(movie._id),
      this.quoteRepository.deleteMany({ movie: movie._id, user: user._id }),
    ]);

    return deleted;
  }

  @Query(() => [MostFavoritedResult])
  async mostFavorited(): Promise<MostFavoritedResult[]> {
    return await this.favoriteRepository.mostFavorited();
  }
  @Query(() => [Movie])
  @UseGuards(GqlAuthGuard)
  async myFavorites(@CurrentUser() user: User): Promise<Movie[]> {
    return await this.favoriteRepository.findMoviesByUserId(user._id);
  }
}

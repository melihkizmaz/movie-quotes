import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FavoriteRepository } from '../../domain/favorite/favorite.repository';
import { Quote } from '../../domain/quote/quote';
import { QuoteRepository } from '../../domain/quote/quote.repository';
import { User } from '../../domain/user/user';
import { GqlAuthGuard } from '../../security/guards/graphql-auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { QuoteCreateInput } from './dto/quote-create.input';
import { Types } from 'mongoose';

@Resolver()
export class QuoteResolver {
  constructor(
    private readonly quoteRepository: QuoteRepository,
    private readonly favoriteRepository: FavoriteRepository,
  ) {}
  @Query(() => [Quote])
  async movieQuotes(@Args('movieId') movieId: string): Promise<Quote[]> {
    return await this.quoteRepository.getByMovieId(movieId);
  }

  @Mutation(() => Quote)
  @UseGuards(GqlAuthGuard)
  async createQuote(
    @CurrentUser() user: User,
    @Args('input') quoteCreateInput: QuoteCreateInput,
  ): Promise<Quote> {
    const isFavoritedMovie = await this.favoriteRepository.findOne({
      user: user._id,
      movie: new Types.ObjectId(quoteCreateInput.movie),
    });
    if (!isFavoritedMovie) throw new NotFoundException('Movie not favorited');

    return await this.quoteRepository.create({
      ...quoteCreateInput,
      user: user._id,
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async removeQuote(
    @CurrentUser() user: User,
    @Args('quoteId') quoteId: string,
  ): Promise<boolean> {
    return await this.quoteRepository.deleteOne({
      _id: new Types.ObjectId(quoteId),
      user: user._id,
    });
  }
}

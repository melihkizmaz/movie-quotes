import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Movie } from '../../domain/movies/movie';
import { MovieRepository } from '../../domain/movies/movie.repository';
import { Quote } from '../../domain/quote/quote';
import { QuoteRepository } from '../../domain/quote/quote.repository';
import { ImdbService } from '../../infrastructure/imdb/imdb.service';

@Resolver()
export class MovieResolver {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly quoteRepository: QuoteRepository,
    private readonly imdbService: ImdbService,
  ) {}

  @Mutation(() => Movie)
  async movie(@Args('movieId') movieId: string): Promise<Movie> {
    return await this.movieRepository.findOrCreateByMovieId(movieId);
  }
  @Query(() => [Movie])
  async searchMovies(@Args('query') query: string): Promise<Partial<Movie>[]> {
    return await this.imdbService.searchMovie(query);
  }
  @Query(() => [Quote])
  async movieQuotes(@Args('movieId') movieId: string): Promise<Quote[]> {
    return await this.quoteRepository.getByMovieId(movieId);
  }
}

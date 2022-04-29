import { Injectable } from '@nestjs/common';
import { Movie } from '../../../domain/movies/movie';
import { IApiMovie, IApiMovieDetails } from '../interfaces/api-movie.interface';

@Injectable()
export class ImdbMapper {
  mapApiSearch(apiSearch: IApiMovie[]): Partial<Movie>[] {
    return apiSearch.map((element: IApiMovie) => ({
      movieId: element.id,
      title: element.title,
      description: element.overview,
      raiting: element.vote_average,
      imageUrl: element.poster_path,
      adult: element.adult,
      language: element.original_language,
    }));
  }

  mapApiMovie(apiMovie: IApiMovieDetails): Movie {
    const movie = new Movie();
    movie.movieId = apiMovie.id;
    movie.title = apiMovie.title;
    movie.description = apiMovie.overview;
    movie.rating = apiMovie.vote_average;
    movie.imageUrl = apiMovie.poster_path;
    movie.adult = apiMovie.adult;
    movie.language = apiMovie.original_language;
    movie.time = apiMovie.runtime;
    movie.tagline = apiMovie.tagline;
    movie.video = apiMovie.video;
    movie.videoUrls = [];

    return movie;
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { Movie } from '../../domain/movies/movie';
import { ImdbMapper } from './dto/imdb.mapper';
import { IApiMovieDetails, IApiSearch } from './interfaces/api-movie.interface';
import { IApiVideo } from './interfaces/api-video.interface';

@Injectable()
export class ImdbService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly imdbMapper: ImdbMapper,
    private readonly http: HttpService,
  ) {
    this.apiKey = configService.get('imdbSecret') ?? '';
    this.apiUrl = configService.get('imdbUrl') ?? '';
  }

  async searchMovie(searchKeywords: string): Promise<Partial<Movie>[]> {
    if (searchKeywords.length < 3) {
      return [];
    }
    const codedKeywords = searchKeywords.split(' ').join('+');

    const $response = this.http.get<IApiSearch>(
      `${this.apiUrl}/search/movie?api_key=${
        this.apiKey
      }&query=${encodeURIComponent(codedKeywords)}`,
    );
    const response = await lastValueFrom($response);
    if (!response.data) throw new NotFoundException('There is no data');
    return this.imdbMapper.mapApiSearch(response.data.results);
  }

  async getMovieById(id: string): Promise<Movie> {
    const $response = this.http.get<IApiMovieDetails>(
      `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`,
    );
    const response = await lastValueFrom($response);
    if (!response.data) throw new NotFoundException('There is no data');
    const movie = this.imdbMapper.mapApiMovie(response.data);
    movie.videoUrls = await this.getMovieVideos(id);

    return movie;
  }
  private async getMovieVideos(movieId: string): Promise<string[]> {
    const $response = this.http.get<IApiVideo>(
      `${this.apiUrl}/movie/${movieId}/videos?api_key=${this.apiKey}&language=en-US`,
    );
    const response = await lastValueFrom($response);
    if (!response.data) throw new NotFoundException('There is no data');
    const videosArray: string[] = [];
    response.data.results.forEach((result) => {
      videosArray.push(result.key);
    });

    return videosArray;
  }
}

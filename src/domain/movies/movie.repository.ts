import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from '../entity.repository';
import { Movie, MovieDocument } from './movie';
import { Model } from 'mongoose';
import { ImdbService } from '../../infrastructure/imdb/imdb.service';

@Injectable()
export class MovieRepository extends EntityRepository<Movie, MovieDocument> {
  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,
    private readonly imdbService: ImdbService,
  ) {
    super(movieModel);
  }
  async findOrCreateByMovieId(id: string): Promise<Movie> {
    const movie = await this.movieModel.findOne({ movieId: id }).exec();
    if (movie) {
      return movie;
    }
    const newMovie = await this.imdbService.getMovieById(id);

    return await this.movieModel.create(newMovie);
  }
}

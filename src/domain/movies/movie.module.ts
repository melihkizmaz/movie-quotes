import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImdbModule } from '../../infrastructure/imdb/imdb.module';
import { Movie, MovieSchema } from './movie';
import { MovieRepository } from './movie.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    ImdbModule,
  ],
  providers: [MovieRepository],
  exports: [MovieRepository],
})
export class MovieModule {}

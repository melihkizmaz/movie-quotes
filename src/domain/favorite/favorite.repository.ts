import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from '../entity.repository';
import { Favorite, FavoriteDocument } from './favorite';
import { Model, Types } from 'mongoose';
import { MostFavoritedResult } from '../../resolvers/favorite/dto/most-favorited.result';
import { Movie } from '../movies/movie';

@Injectable()
export class FavoriteRepository extends EntityRepository<
  Favorite,
  FavoriteDocument
> {
  constructor(
    @InjectModel('Favorite')
    private readonly favoriteModel: Model<FavoriteDocument>,
  ) {
    super(favoriteModel);
  }

  async checkUserFavorites(userId: string, movieId: string): Promise<boolean> {
    const favorite = await this.favoriteModel.findOne({
      user: new Types.ObjectId(userId),
      movie: new Types.ObjectId(movieId),
    });

    return !!favorite;
  }

  async mostFavorited(): Promise<MostFavoritedResult[]> {
    return await this.favoriteModel
      .aggregate<MostFavoritedResult>([
        {
          $group: {
            _id: '$movie',
            count: {
              $count: {},
            },
          },
        },
        {
          $lookup: {
            from: 'movies',
            let: {
              userId: '$_id',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$userId'],
                  },
                },
              },
            ],
            as: 'movieDetail',
          },
        },
      ])
      .sort({ count: -1, _id: -1 })
      .exec();
  }

  async findMoviesByUserId(userId: Types.ObjectId): Promise<Movie[]> {
    const favorites = await this.favoriteModel
      .find({ user: userId })
      .populate<{ movie: Movie }>('movie')
      .exec();

    return favorites.map((favorite) => favorite.movie);
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './favorite';
import { FavoriteRepository } from './favorite.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
  ],
  providers: [FavoriteRepository],
  exports: [FavoriteRepository],
})
export class FavoriteModule {}

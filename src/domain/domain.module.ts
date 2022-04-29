import { Module } from '@nestjs/common';
import { MovieModule } from './movies/movie.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';
import { QuoteModule } from './quote/quote.module';
@Module({
  imports: [UserModule, MovieModule, FavoriteModule, QuoteModule],
})
export class DomainModule {}

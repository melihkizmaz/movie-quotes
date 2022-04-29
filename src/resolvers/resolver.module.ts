import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MovieModule } from '../domain/movies/movie.module';
import { UserModule } from '../domain/user/user.module';
import { AuthResolver } from './auth/auth.resolver';
import { UserResolver } from './user/user.resolver';
import { FavoriteResolver } from './favorite/favorite.resolver';
import { FavoriteModule } from '../domain/favorite/favorite.module';
import { SecurityModule } from '../security/security.module';
import { ImdbModule } from '../infrastructure/imdb/imdb.module';
import { QuoteResolver } from './quote/quote.resolver';
import { QuoteModule } from '../domain/quote/quote.module';
import { MovieResolver } from './movie/movie.resolver';

@Module({
  imports: [
    UserModule,
    MovieModule,
    FavoriteModule,
    SecurityModule,
    ImdbModule,
    QuoteModule,
  ],
  providers: [
    UserResolver,
    ConfigService,
    AuthResolver,
    FavoriteResolver,
    QuoteResolver,
    MovieResolver,
  ],
  exports: [
    UserResolver,
    ConfigService,
    AuthResolver,
    FavoriteResolver,
    QuoteResolver,
    MovieResolver,
  ],
})
export class ResolverModule {}

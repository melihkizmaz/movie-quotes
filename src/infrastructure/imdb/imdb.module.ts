import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImdbMapper } from './dto/imdb.mapper';
import { ImdbService } from './imdb.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ImdbService, ImdbMapper],
  exports: [ImdbService],
})
export class ImdbModule {}

import { JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModuleOptions } from '@nestjs/mongoose';

interface Configs {
  port: number;
  database: MongooseModuleOptions;
  secret: string;
  imdbSecret: string;
  imdbUrl: string;
  jwtOptions: JwtModuleOptions;
}

const config = (): Configs => ({
  port: Number(process.env.PORT) || 3000,
  database: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/test',
  },
  secret: process.env.SECRET || 'secret',
  imdbSecret: process.env.IMDB_SECRET || 'imdbSecret',
  imdbUrl: process.env.IMDB_URL || 'imdbUrl',
  jwtOptions: {
    secret: process.env.JWT_SECRET || 'jwtSecret',
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES || '1d',
    },
  },
});

export default config;

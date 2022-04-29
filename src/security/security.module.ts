import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from './helpers/token.services';
import { JwtStrategy } from './guards/jwt-auth.guard';
import { GqlAuthGuard } from './guards/graphql-auth.guard';
import { UserModule } from '../domain/user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('jwtOptions', {}),
    }),
    ConfigModule,
    UserModule,
  ],
  providers: [TokenService, JwtStrategy, GqlAuthGuard],
  exports: [TokenService, JwtStrategy, GqlAuthGuard],
})
export class SecurityModule {}

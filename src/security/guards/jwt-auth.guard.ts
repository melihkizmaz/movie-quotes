import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtOptions').secret,
    });
  }

  async validate(payload: User): Promise<User> {
    const user = await this.userRepository.findByEmail(payload?.email);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}

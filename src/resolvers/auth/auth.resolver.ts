import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserRepository } from '../../domain/user/user.repository';
import { TokenService } from '../../security/helpers/token.services';
import { LoginResult } from './dto/login.result';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  @Query(() => LoginResult)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const isValid = await user.validatePassword(password);
    if (!isValid) throw new UnauthorizedException('Invalid password');

    return { token: await this.tokenService.generateJwtToken(user), user };
  }
}

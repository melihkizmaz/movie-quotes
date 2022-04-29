import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../../domain/user/user';
import { UserRepository } from '../../domain/user/user.repository';
import { UserCreateInput } from './dto/user-create.input';
import bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../security/guards/graphql-auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { FavoriteRepository } from '../../domain/favorite/favorite.repository';
import { QuoteRepository } from '../../domain/quote/quote.repository';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly favoriteRepository: FavoriteRepository,
    private readonly quoteRepository: QuoteRepository,
  ) {}

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async users(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('input') userCreateInput: UserCreateInput,
  ): Promise<User> {
    const password = bcrypt.hashSync(userCreateInput.password, 10);

    return await this.userRepository.create({ ...userCreateInput, password });
  }
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async removeMyAccount(@CurrentUser() user: User): Promise<boolean> {
    await Promise.all([
      this.favoriteRepository.deleteMany({
        user: user._id,
      }),
      this.quoteRepository.deleteMany({
        userId: user._id,
      }),
    ]);

    return await this.userRepository.deleteOne({ _id: user._id });
  }
}

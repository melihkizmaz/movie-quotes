import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../domain/user/user';

@ObjectType()
export class LoginResult {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}

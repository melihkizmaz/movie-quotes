import { Field, InputType } from '@nestjs/graphql';
import { User } from '../../../domain/user/user';
import {
  IsEmail,
  IsPhoneNumber,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UserCreateInput extends User {
  @MinLength(0)
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @IsPhoneNumber('TR')
  @Field(() => String)
  phone: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MaxLength(20)
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @Field(() => String)
  password: string;
}

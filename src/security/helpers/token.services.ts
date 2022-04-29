import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user/user';
import { JwtService } from '@nestjs/jwt';

export type SanitizedUser = Pick<
  User,
  '_id' | 'firstName' | 'lastName' | 'email' | 'phone'
>;

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}
  async generateJwtToken(user: User): Promise<string> {
    return this.jwtService.sign(this.sanitizeUser(user));
  }

  private sanitizeUser({
    _id,
    email,
    firstName,
    lastName,
    phone,
  }: User): SanitizedUser {
    return { _id, email, firstName, lastName, phone };
  }
}

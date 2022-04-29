import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from '../entity.repository';
import { User, UserDocument } from './user';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends EntityRepository<User, UserDocument> {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
  ) {
    super(UserModel);
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.entityModel.findOne({ email }).exec();
  }
}

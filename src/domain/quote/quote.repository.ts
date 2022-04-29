import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from '../entity.repository';
import { Quote, QuoteDocument } from './quote';
import { Model } from 'mongoose';

@Injectable()
export class QuoteRepository extends EntityRepository<Quote, QuoteDocument> {
  constructor(
    @InjectModel('Quote')
    private readonly quoteModel: Model<QuoteDocument>,
  ) {
    super(quoteModel);
  }

  async getByMovieId(movieId: string): Promise<QuoteDocument[]> {
    return await this.quoteModel.find({ movie: movieId }).exec();
  }
}

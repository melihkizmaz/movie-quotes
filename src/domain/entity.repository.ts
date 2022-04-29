import { Document, Model, FilterQuery } from 'mongoose';

export abstract class EntityRepository<T, D extends Document> {
  protected constructor(protected readonly entityModel: Model<D>) {}

  async create(entity: T): Promise<D> {
    return this.entityModel.create(entity);
  }
  async findOne(query: FilterQuery<T>): Promise<D | null> {
    return this.entityModel.findOne(query).exec();
  }
  async deleteOne(query: FilterQuery<T>): Promise<boolean> {
    const result = await this.entityModel.findOneAndRemove(query).exec();
    return !!result;
  }
  async deleteMany(query: FilterQuery<T>): Promise<boolean> {
    const result = await this.entityModel.deleteMany(query).exec();
    return !!result;
  }
  async findAll(): Promise<D[]> {
    return this.entityModel.find().exec();
  }

  async findById(id: string): Promise<D | null> {
    return this.entityModel.findById(id).exec();
  }
  async deleteById(id: string): Promise<boolean> {
    const result = await this.entityModel.findByIdAndRemove(id).exec();
    return !!result;
  }
}

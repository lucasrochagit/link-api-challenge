import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { MongoQueryModel } from 'nest-mongo-query-parser';
import { Deal, DealAggregate, DealDocument } from '../schema/deal.schema';

@Injectable()
export class DealRepository {
  constructor(
    @InjectModel(Deal.name) private readonly _model: Model<DealDocument>,
  ) {}

  async create(item: DealDocument): Promise<Deal> {
    return this._model.create(item);
  }

  async find(query: MongoQueryModel): Promise<Deal[]> {
    return this._model
      .find(query.filter)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .select(query.select)
      .exec();
  }

  async aggregate(filter: FilterQuery<DealDocument>): Promise<DealAggregate[]> {
    return this._model.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$date',
          total_value: { $sum: '$value' },
          count: { $sum: 1 },
        },
      },
      { $project: { _id: 0, date: '$_id', total_value: 1, count: 1 } },
    ]);
  }

  async count(query: MongoQueryModel): Promise<number> {
    return this._model.count(query.filter);
  }

  async checkExists(filter: FilterQuery<DealDocument>): Promise<boolean> {
    const result = await this._model.findOne(filter);
    return !!result;
  }
}

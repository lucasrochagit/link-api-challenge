import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { DealService } from '../../business/service/deal.service';
import { FindDealsByDateDTO } from '../dto/deal.dto';

@Controller('deals')
export class DealController {
  constructor(private readonly _service: DealService) {}

  @Get()
  async find(@MongoQuery() query: MongoQueryModel, @Res() response: Response) {
    const result = await this._service.find(query);
    const count = await this._service.count(query);
    response.setHeader('X-Total-Count', count);
    return response.status(HttpStatus.OK).send(result);
  }

  @Get('/:date/aggregate')
  async aggregateFromDate(@Param() param: FindDealsByDateDTO) {
    return this._service.aggregateByDate(param);
  }
}

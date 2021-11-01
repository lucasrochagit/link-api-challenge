import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { MongoQueryModel } from 'nest-mongo-query-parser';
import { BlingRepository } from '../../infrastructure/repository/bling.repository';
import { DealRepository } from '../../infrastructure/repository/deal.repository';
import { PipedriveRepository } from '../../infrastructure/repository/pipedrive.repository';
import { Deal } from '../../infrastructure/schema/deal.schema';
import { FindDealsByDateDTO } from '../../presentation/dto/deal.dto';
import { DealStatus } from '../enum/deal.enum';
import { BlingOrderMapper } from '../mapper/bling.order.mapper';
import { DealMapper } from '../mapper/deal.mapper';

@Injectable()
export class DealService {
  private readonly logger: Logger;

  constructor(
    private readonly _dealRepository: DealRepository,
    private readonly _pipedriveRepository: PipedriveRepository,
    private readonly _blingRepository: BlingRepository,
    private readonly _blingOrderMapper: BlingOrderMapper,
    private readonly _dealMapper: DealMapper,
  ) {
    this.logger = new Logger(DealService.name);
  }

  async find(query: MongoQueryModel): Promise<Deal[]> {
    return this._dealRepository.find(query);
  }

  async count(query: MongoQueryModel): Promise<number> {
    return this._dealRepository.count(query);
  }

  async aggregateByDate(filter: FindDealsByDateDTO) {
    return this._dealRepository.aggregate(filter);
  }

  @Cron('0 0 21 * * *')
  async manageWonDeals(): Promise<void> {
    try {
      const deals = await this._pipedriveRepository.findDeals({
        status: DealStatus.WON,
      });
      if (deals.data) {
        await Promise.all(
          deals.data.map((deal: any) => this.saveOrder(deal)),
        ).catch((err) => {
          this.logger.error(err);
        });
      }
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async saveOrder(deal: any): Promise<void> {
    const isAlreadyPublished = await this._dealRepository.checkExists({
      deal_id: deal.id,
    });
    if (!isAlreadyPublished) {
      const products = await this._pipedriveRepository.findProductsFromDeal(
        deal.id,
      );
      const today = moment().format('yyyy-MM-DD');
      const xmlOrder = this._blingOrderMapper.toXmlBlingOrder(
        deal,
        products.data,
        today,
      );
      const dealSchema = this._dealMapper.toDocument(
        deal,
        products.data,
        today,
      );
      await this._blingRepository.createOrder(xmlOrder);
      await this._dealRepository.create(dealSchema);
    }
  }
}

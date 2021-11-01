import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DealMapper } from '../../business/mapper/deal.mapper';
import { DealService } from '../../business/service/deal.service';
import { DealRepository } from '../../infrastructure/repository/deal.repository';
import { Deal, DealSchema } from '../../infrastructure/schema/deal.schema';
import { DealController } from '../../presentation/controller/deal.controller';
import { BlingModule } from './bling.module';
import { PipedriveModule } from './pipedrive.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deal.name, schema: DealSchema }]),
    PipedriveModule,
    BlingModule,
  ],
  controllers: [DealController],
  providers: [DealService, DealRepository, DealMapper],
})
export class DealModule {}

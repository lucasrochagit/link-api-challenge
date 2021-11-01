import { Module } from '@nestjs/common';
import { BlingOrderMapper } from '../../business/mapper/bling.order.mapper';
import { BlingRepository } from '../../infrastructure/repository/bling.repository';

@Module({
  providers: [BlingRepository, BlingOrderMapper],
  exports: [BlingRepository, BlingOrderMapper],
})
export class BlingModule {}

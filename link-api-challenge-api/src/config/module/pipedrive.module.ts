import { Module } from '@nestjs/common';
import { PipedriveRepository } from '../../infrastructure/repository/pipedrive.repository';

@Module({
  providers: [PipedriveRepository],
  exports: [PipedriveRepository],
})
export class PipedriveModule {}

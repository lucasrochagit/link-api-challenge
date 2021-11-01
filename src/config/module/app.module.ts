import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from '../../business/service/app.service';
import { AppController } from '../../presentation/controller/app.controller';
import { DealModule } from './deal.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      retryDelay: +process.env.DATABASE_RETRY_DELAY,
      retryAttempts: +process.env.DATABASE_RETRY_ATTEMPTS,
    }),
    DealModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from '../../business/service/app.service';
import { AppController } from '../../presentation/controller/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      retryDelay: +process.env.DATABASE_RETRY_DELAY,
      retryAttempts: +process.env.DATABASE_RETRY_ATTEMPTS,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

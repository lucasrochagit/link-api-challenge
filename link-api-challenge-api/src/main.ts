import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './config/module/app.module';
import { MorganLogger } from './config/logger/morgan.logger';
import { TimeoutInterceptor } from './config/interceptor/timeout.interceptor';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  setMiddlewares(app);
  await app.listen(PORT);
}

function setMiddlewares(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  MorganLogger.setupMorgan(app);
}

bootstrap();

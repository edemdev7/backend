import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', 
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe());

  const expressApp = app.getHttpAdapter().getInstance();

  expressApp.set('trust proxy', true);

  app.use(cookieParser())
  await app.listen(3000);
}
bootstrap();

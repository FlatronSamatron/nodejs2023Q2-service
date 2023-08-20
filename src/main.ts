import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as session from 'express-session';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.SECRET || 'secret',
    }),
  );
  await app.listen(process.env.PORT || 4000);
}
bootstrap();

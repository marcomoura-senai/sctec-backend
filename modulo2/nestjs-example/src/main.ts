import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDatabase } from './@common/database/typeorm/typeorm';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  await initDatabase();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch(console.error);

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = await app.resolve(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();

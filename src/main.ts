import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { httpLogger } from './common/middleware/logger.middleware';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(httpLogger);

  await app.listen(config.get('port') ?? 3000);
}
bootstrap();

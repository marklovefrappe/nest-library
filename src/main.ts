import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { httpLogger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(httpLogger);

  await app.listen(3000);
}
bootstrap();

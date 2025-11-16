import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.set('query parser', 'extended');
  app.use(helmet());

  const config = app.get(ConfigService);
  app.enableCors({
    origin:
      config.get<string>('NODE_ENV') !== 'development'
        ? config.get<string>('ALLOWED_ORIGIN')
        : '*',
  });

  await app.listen(config.get<number>('PORT') ?? 3000);
  console.log(`App running on port ${await app.getUrl()}`);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
  process.exit(1);
});

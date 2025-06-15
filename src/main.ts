import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (allow your frontend origin or all)
  app.enableCors({
    origin: '*', // For testing, allow all. For production, specify frontend URL.
  });

  await app.listen(3001);
}
bootstrap();

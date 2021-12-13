import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  // app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
  console.log(`connected to port ${port}`);
}
bootstrap();

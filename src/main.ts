import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // app.use(
  //   session({
  //     secret: process.env.SECRET_KEY,
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       maxAge: 15 * 60 * 1000,
  //     },
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();

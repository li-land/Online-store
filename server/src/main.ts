import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT ?? 5000;

async function start() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Интернет-магазин TableFair')
    .setDescription('API интернет-магазина')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log('Server started in PORT ' + PORT);
  });
}
start();

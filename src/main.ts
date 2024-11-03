import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  console.log(process.env.DATABASE_URL);

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CG Challenge')
    .setDescription('This is a challenge for CG buildt on Nest.js')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.enableCors({
    origin: '*',
  });

  await app.listen(3001);
}
bootstrap();

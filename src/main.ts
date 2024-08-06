import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const initSwagger = (app) => {
  const config = new DocumentBuilder().setTitle('CRM API').setVersion('1.0').addTag('API').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = app.get(ConfigService);
  const port = config.get('port');
  initSwagger(app);

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port);
}
bootstrap();

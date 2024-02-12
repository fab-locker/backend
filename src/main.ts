import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Fablocker')
    .setDescription(
      'Find below the list of available endpoints to interact with the lockers.',
    )
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options = {
    customCss: '.swagger-ui .topbar { display: none } ',
  };
  SwaggerModule.setup('api', app, document, options);

  await app.listen(3000);
}

bootstrap();

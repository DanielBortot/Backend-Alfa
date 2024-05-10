import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Alfa Backend')
    .setDescription('API REST Alfa endpoints')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes( new ValidationPipe({
    transform: true,
    forbidNonWhitelisted: true,
    whitelist: true
  }));
  
  app.enableCors({origin: '*'});
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

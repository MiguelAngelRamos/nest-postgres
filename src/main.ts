import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      // permite: solamente las propiedades definidas en los Dtos
      whitelist: true,
      // Rechaza las solicitudes que contengan propiedades que no estan definidas en los Dtos
      forbidNonWhitelisted: true
    })
  );
  // Configuración de Swagger
  const config = new DocumentBuilder()
  .setTitle('Product API')
  .setDescription('API para la gestion productos (CRUD)')
  .setVersion('1.0')
  .addTag('productos')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  // Configurar el endpoint en el que servirá la documentación Swagger
  SwaggerModule.setup('api', app, document);

  await app.listen(envs.port);
  console.log(`Server running port: ${envs.port}`);
}
bootstrap();

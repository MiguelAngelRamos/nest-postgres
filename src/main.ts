import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
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
  )
  await app.listen(envs.port);
  console.log(`Server running port: ${envs.port}`);
}
bootstrap();

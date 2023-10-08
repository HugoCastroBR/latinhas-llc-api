import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  ;

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Demandas')
    .setDescription('Descrição de demandas')
    .setVersion('1.0')
    .addTag('demandas')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: '*' });
  await app.listen(4444);
}
bootstrap();

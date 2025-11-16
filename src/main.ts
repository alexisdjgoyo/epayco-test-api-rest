import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('ePayco Wallet API')
    .setDescription(
      'API REST para billetera virtual ePayco - Puente entre cliente y servicio SOAP',
    )
    .setVersion('1.0')
    .addTag('wallet', 'Operaciones de billetera virtual')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'ePayco Wallet API Docs',
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 Servicio REST ejecutándose en http://localhost:3000');
  console.log('📚 Documentación Swagger en http://localhost:3000/api');
}
bootstrap();

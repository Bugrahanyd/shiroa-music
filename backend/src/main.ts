import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import helmet from 'helmet';
// import rateLimit from 'express-rate-limit'; // Rate limit'i geçici olarak kapattık
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { LoggerService } from './common/logger.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    cors: true // NestJS'in kendi basit CORS'unu açtık
  });
  
  // Trust proxy for Render
  app.set('trust proxy', 1);
  
  // Logger and Exception Filter
  const logger = app.get(LoggerService);
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/'
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3001;

  // Güvenlik başlıkları (Helmet) - Biraz gevşettik
  app.use(helmet({
    contentSecurityPolicy: false, // CSP bazen sorun çıkarabilir, MVP için kapattık
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));
  
  /* // RATE LIMIT'I GEÇİCİ OLARAK KAPATIYORUZ
  // Çünkü giriş yapmaya çalışırken seni engelliyor olabilir.
  const generalLimiter = rateLimit({ ... });
  app.use(generalLimiter);
  */
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      },
      disableErrorMessages: false // Hataları net görmek için açtık
    })
  );

  // CORS - KESİN ÇÖZÜM (Her yerden gelen isteği kabul et)
  app.enableCors({
    origin: true, // Gelen isteğin origin'ini otomatik kabul et (Ayna gibi yansıtır)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(port);
  console.log(`🚀 SHIROA Backend running on http://localhost:${port}`);
}
bootstrap();
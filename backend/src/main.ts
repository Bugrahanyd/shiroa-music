import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
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

  // Güvenlik başlıkları (Helmet)
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  }));
  
  // Rate limiting - DDoS koruması
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100, // 100 request per IP
    message: 'Too many requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(generalLimiter);

  // AI endpoints için strict limit (pahalı işlemler)
  const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 saat
    max: 10, // 10 AI generation per hour
    message: 'AI generation limit reached. Please try again later.',
  });
  app.use('/ai/', aiLimiter);
  
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

  // CORS - Production güvenlik
  const allowedOrigins = [
    'http://localhost:3000',
    'https://shiroa.vercel.app',
    'https://shiroa.com',
    'https://www.shiroa.com',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Development: origin undefined olabilir (Postman, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(port);
  console.log(`🚀 SHIROA Backend running on http://localhost:${port}`);
}
bootstrap();
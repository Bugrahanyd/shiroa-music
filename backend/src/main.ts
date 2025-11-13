import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3001;

  app.use(helmet());
  
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
  });
  app.use(limiter);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      },
      disableErrorMessages: configService.get('NODE_ENV') === 'production'
    })
  );

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://shiroa.vercel.app',
      'https://shiroa-git-develop-bugrahanyds-projects.vercel.app',
      /\.vercel\.app$/
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });
  await app.listen(port);
  console.log(`🚀 SHIROA Backend running on http://localhost:${port}`);
}
bootstrap();

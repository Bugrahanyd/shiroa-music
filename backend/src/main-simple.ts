import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppSimpleModule } from "./app-simple.module";

async function bootstrap() {
  const app = await NestFactory.create(AppSimpleModule);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3001;

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true
  });

  await app.listen(port);
  console.log(`🚀 SHIROA Backend (Simple) running on http://localhost:${port}`);
}
bootstrap();
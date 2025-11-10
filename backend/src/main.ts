import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 3001;

  app.enableCors();
  await app.listen(port);
  console.log(`🚀 SHIROA Backend running on http://localhost:${port}`);
}
bootstrap();

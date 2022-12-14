import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { isNull } from "./utils";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  const config = new DocumentBuilder()
    .setTitle("Band App")
    .setDescription("The band API description")
    .setVersion("1.0.0")
    .addTag("Bands")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
  const port = process.env["PORT"];
  console.log(
    "🚀 ~ file: main.ts:19 ~ bootstrap ~ port",
    isNull(port) ? 3000 : port
  );
  return await app.listen(isNull(port) ? 3000 : port);
};

bootstrap();

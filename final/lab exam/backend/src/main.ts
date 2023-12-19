import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      name: 'Session',
      secret: 'secret',
      resave: false, //prevent forcefully resave
      saveUninitialized: false, //prevent uninitalized session
      cookie: {
        maxAge: 3600000, //1hr
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  ///swegger
  const config = new DocumentBuilder()
    .setTitle('Finance and Billing Automation')
    .setDescription('Finance and Billing Automation API')
    .setVersion('1.0')
    .addTag('Finance and Billing Automation API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
//
  app.enableCors(); //
  await app.listen(8000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';


import {
  FastifyAdapter,
  NestFastifyApplication,
}

from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { jwtConstants } from './common/constants';
// import fastifySecureSession from '@fastify/secure-session';
// import fastifyCookie from '@fastify/cookie';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // await app.register(fastifySecureSession, {
  //   secret: jwtConstants.secret,
  //   salt: 'mq9hDxBVDbspDR6n',
  // });  

  // await app.register(fastifyCookie, {
  //   secret: jwtConstants.secret,
  // });

  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  });

    /** @note global validation */
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3000);

  await app.listen(port);
}
bootstrap();
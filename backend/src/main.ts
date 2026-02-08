import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
  const allowedOrigins = [
    frontendUrl.replace(/\/$/, ''), // Remove trailing slash
    'http://localhost:3001',
    'https://litetech-liart.vercel.app',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      // Normalize origin by removing trailing slash
      const normalizedOrigin = origin.replace(/\/$/, '');
      
      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

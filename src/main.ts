import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Advanced CORS setting taaki Next.js se connection block na ho
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Saare methods allow karo
    credentials: true, // Cookies aur Session allow karne ke liye
    allowedHeaders: 'Content-Type, Accept, Authorization', // Specific headers allow karo
  });

  await app.listen(5000);
  console.log('🚀 Backend running on http://localhost:5000');
}
bootstrap();
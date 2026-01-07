// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module'; // ← ONLY import the module

@Module({
  imports: [
    AuthModule, // ← Only this line for auth
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
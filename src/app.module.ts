import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt.guard';



import { UsersModule } from './users/users.module';
import { TeamMemberModule } from './team-members/team-members.module';
import { SkillModule } from './skills/skill.module';
import { ProjectModule } from './projects/project.module';
import { EpicModule } from './epics/epic.module';
import { TaskModule } from './tasks/task.module';
import { AiModule } from './ai/ai.module';
import { PerformanceModule } from './performance/performance.module';
import { RiskModule } from './risk/risk.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TeamMemberModule,
    SkillModule,
    ProjectModule,
    EpicModule,
    TaskModule,
    AiModule,
    PerformanceModule,
    RiskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaService } from './prisma/prisma.service';

import { AuthModule } from './auth/auth/auth.module';
import { JwtAuthGuard } from './auth/auth/jwt.guard';
import { PrismaModule } from './prisma/prisma.module';


import { UsersModule } from './users/users.module';

import { SkillModule } from './skills/skill.module';
import { ProjectModule } from './projects/project.module';
import { EpicModule } from './epics/epic.module';
import { TaskModule } from './tasks/task.module';
import { AiModule } from './ai/ai.module';
import { PerformanceModule } from './performance/performance.module';
import { RiskModule } from './risk/risk.module';
import { CostModule } from './cost/cost.module';
import { AiFeedbackModule } from './ai-feedback/ai-feedback.module';
import { WorkflowModule } from './workflow/workflow.module';
import { NotificationModule } from './notification/notification.module';
import { AgentModule } from './agent/agent.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TeamMembersModule } from './team-members/team-members.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    TeamMembersModule,
    SkillModule,
    ProjectModule,
    EpicModule,
    TaskModule,
    AiModule,
    PerformanceModule,
    RiskModule,
    CostModule,
    AiFeedbackModule,
    WorkflowModule,
    NotificationModule,
    AgentModule,
    DashboardModule
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

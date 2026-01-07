// // src/app.module.ts
// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { PrismaService } from './prisma/prisma.service';
// import { AuthModule } from './auth/auth.module'; // ← ONLY import the module

// @Module({
//   imports: [
//     AuthModule, // ← Only this line for auth
//   ],
//   controllers: [AppController],
//   providers: [AppService, PrismaService],
// })
// export class AppModule {}


// src/app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt.guard';
import { UsersModule } from './users/users.module';
import { TeamMembersService } from './team-members/team-members.service';
import { SkillsService } from './skills/skills.service';
import { ProjectsService } from './projects/projects.service';
import { EpicsService } from './epics/epics.service';
import { TasksService } from './tasks/tasks.service';
import { AiService } from './ai/ai.service';

import { TeamMembersController } from './team-members/team-members.controller';
import { TeamMembersModule } from './team-members/team-members.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TeamMembersModule,
    TeamMembersController,
    // future modules like users, team-members, projects, tasks will go here
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // ← This makes all routes protected by default
    },
    TeamMembersService,
    SkillsService,
    ProjectsService,
    EpicsService,
    TasksService,
    AiService,
  ],
})
export class AppModule {}

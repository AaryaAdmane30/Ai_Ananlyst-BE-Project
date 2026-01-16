// src/team-member/team-member.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TeamMemberController } from './team-members.controller';
import { TeamMemberService } from './team-members.service';
@Module({
  controllers: [TeamMemberController],
  providers: [TeamMemberService, PrismaService],
  exports: [TeamMemberService],
})
export class TeamMemberModule {}

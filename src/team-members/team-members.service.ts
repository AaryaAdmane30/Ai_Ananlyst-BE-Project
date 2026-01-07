import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeamMembersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.teamMember.findMany();
  }

  findOne(id: string) {
    return this.prisma.teamMember.findUnique({ where: { id } });
  }

  create(data: CreateTeamMemberDto) {
    const prismaData: Prisma.TeamMemberCreateInput = {
      role: data.role,
      availabilityHours: data.availabilityHours ?? 40,
      currentWorkload: data.currentWorkload ?? 0,
      user: { connect: { id: data.userId } }, // ⚡ Required relation
    };

    return this.prisma.teamMember.create({ data: prismaData });
  }

  update(id: string, data: UpdateTeamMemberDto) {
    const prismaData: Prisma.TeamMemberUpdateInput = {
      role: data.role,
      availabilityHours: data.availabilityHours,
      currentWorkload: data.currentWorkload,
    };

    return this.prisma.teamMember.update({ where: { id }, data: prismaData });
  }

  remove(id: string) {
    return this.prisma.teamMember.delete({ where: { id } });
  }
}

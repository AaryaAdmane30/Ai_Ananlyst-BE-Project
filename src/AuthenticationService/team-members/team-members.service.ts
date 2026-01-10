import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Injectable()
export class TeamMemberService {
  constructor(private prisma: PrismaService) {}

  // Create a new team member
  create(dto: CreateTeamMemberDto) {
    const {
      role,
      availabilityHours,
      currentWorkload,
      hourlyRate,
      preferences,
      userId,
    } = dto;

    return this.prisma.teamMember.create({
      data: {
        role,
        availabilityHours,
        currentWorkload,
        hourlyRate,
        preferences,
        userId,
      },
    });
  }

  // Get all team members
  findAll() {
    return this.prisma.teamMember.findMany({
      include: {
        performances: true, 
      },
    });
  }

  // Get a single team member by ID
  findOne(id: string) {
    return this.prisma.teamMember.findUnique({
      where: { id },
      include: {
        performances: true, 
      },
    });
  }

  // Update a team member
  update(id: string, dto: UpdateTeamMemberDto) {
    const {
      role,
      availabilityHours,
      currentWorkload,
      hourlyRate,
      preferences,
      userId,
    } = dto;

    return this.prisma.teamMember.update({
      where: { id },
      data: {
        role,
        availabilityHours,
        currentWorkload,
        hourlyRate,
        preferences,
        userId,
      },
    });
  }

  // Delete a team member
  remove(id: string) {
    return this.prisma.teamMember.delete({ where: { id } });
  }
}

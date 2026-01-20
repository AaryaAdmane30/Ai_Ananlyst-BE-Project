import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProjectDto, user: any) {
    // Token se user id nikalna (NextAuth 'id' bhejta hai)
    const userId = user.id || user.sub;

    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        status: dto.status || "PLANNING",
        laborCost: dto.laborCost || 0,
        reworkCost: dto.reworkCost || 0,
        infrastructureCost: dto.infrastructureCost || 0,
        totalSavings: dto.totalSavings || 0,
        manager: {
          connect: { id: userId },
        },
      },
      include: { manager: true, epics: true },
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: { manager: true, epics: true },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { manager: true, epics: true },
    });
    if (!project) throw new NotFoundException(`Project not found`);
    return project;
  }

  async update(id: string, dto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: dto,
      include: { manager: true, epics: true },
    });
  }

  async remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
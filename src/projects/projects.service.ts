import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  // Create a new project
  async create(dto: CreateProjectDto) {
    const { managerId, ...rest } = dto;

    if (!managerId) {
      throw new NotFoundException("managerId is required to create a project");
    }

    // Check manager exists
    const managerExists = await this.prisma.user.findUnique({
      where: { id: managerId },
    });

    if (!managerExists) {
      throw new NotFoundException(`Manager with id ${managerId} not found`);
    }

    // Create project with manager connected
    return this.prisma.project.create({
      data: {
        ...rest,
        manager: {
          connect: { id: managerId },
        },
      },
      include: {
        manager: true,
        epics: true,
      },
    });
  }

  // Get all projects
  async findAll() {
    return this.prisma.project.findMany({
      include: { manager: true, epics: true },
    });
  }

  // Get a single project
  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { manager: true, epics: true },
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return project;
  }

  // Update project
  async update(id: string, dto: UpdateProjectDto) {
    if (!dto || Object.keys(dto).length === 0) {
      throw new NotFoundException('No update data provided');
    }

    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    const updateData: any = { ...dto };

    // Handle managerId change
    if (dto.managerId) {
      const manager = await this.prisma.user.findUnique({ where: { id: dto.managerId } });
      if (!manager) {
        throw new NotFoundException(`Manager with id ${dto.managerId} not found`);
      }
      delete updateData.managerId;
      updateData.manager = { connect: { id: dto.managerId } };
    }

    return this.prisma.project.update({
      where: { id },
      data: updateData,
      include: { manager: true, epics: true },
    });
  }

  // Delete project
  async remove(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return this.prisma.project.delete({
      where: { id },
    });
  }
}

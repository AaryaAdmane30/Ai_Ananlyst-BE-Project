// src/epics/epics.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateEpicDto } from './dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EpicService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEpicDto) {
     console.log('Epic DTO:', dto);
    const { projectId, title, description } = dto;

    if (!projectId) {
      throw new NotFoundException('projectId is required to create an epic');
    }
    if (!title) {
      throw new NotFoundException('title is required to create an epic');
    }

    // Check project exists
    const projectExists = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!projectExists) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    // Create the epic
    return this.prisma.epic.create({
      data: {
        title,
        description,
        project: {
          connect: { id: projectId },
        },
      },
      include: {
        project: true,
        tasks: true,
      },
    });
  }

  findAll() {
    return this.prisma.epic.findMany({
      include: { project: true, tasks: true },
    });
  }

  findOne(id: string) {
    return this.prisma.epic.findUnique({
      where: { id },
      include: { project: true, tasks: true },
    });
  }

  async update(id: string, dto: UpdateEpicDto) {
    const epic = await this.prisma.epic.findUnique({ where: { id } });
    if (!epic) {
      throw new NotFoundException(`Epic with id ${id} not found`);
    }

    return this.prisma.epic.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const epic = await this.prisma.epic.findUnique({ where: { id } });
    if (!epic) {
      throw new NotFoundException(`Epic with id ${id} not found`);
    }

    return this.prisma.epic.delete({ where: { id } });
  }
}

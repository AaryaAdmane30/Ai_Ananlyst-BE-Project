import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // CREATE TASK
  create(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        projectId: dto.projectId,
        epicId: dto.epicId,
      },
    });
  }

  // GET ALL TASKS
  findAll() {
    return this.prisma.task.findMany({
      include: {
        project: true,
        epic: true,
        risks: true,
        costs: true,
      },
    });
  }

  // GET SINGLE TASK
  findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        project: true,
        epic: true,
        risks: true,
        costs: true,
      },
    });
  }

  // UPDATE TASK
  update(id: string, dto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        projectId: dto.projectId,
        epicId: dto.epicId,
      },
    });
  }

  // DELETE TASK
  remove(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}

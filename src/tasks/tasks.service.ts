import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTaskDto) {
    return this.prisma.task.create({ data: dto });
  }
async findAllFiltered(projectId?: string, epicId?: string) {
  return this.prisma.task.findMany({
    where: {
      ...(projectId ? { projectId } : {}),
      ...(epicId ? { epicId } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

  findOne(id: string) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }
}

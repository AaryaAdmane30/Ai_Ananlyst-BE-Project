import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Epic } from '@prisma/client';

@Injectable()
export class EpicsService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Epic[]> {
    return this.prisma.epic.findMany();
  }

  findOne(id: string): Promise<Epic | null> {
    return this.prisma.epic.findUnique({ where: { id } });
  }

  create(data: Prisma.EpicCreateInput): Promise<Epic> {
    return this.prisma.epic.create({ data });
  }

  update(id: string, data: Prisma.EpicUpdateInput): Promise<Epic> {
    return this.prisma.epic.update({ where: { id }, data });
  }

  remove(id: string): Promise<Epic> {
    return this.prisma.epic.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';

@Injectable()
export class PerformanceService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePerformanceDto) {
    return this.prisma.performance.create({ data: dto }); // ✅ use model name in schema
  }

  findAll() {
    return this.prisma.performance.findMany({
      include: { member: true }, // ✅ matches schema relation
    });
  }

  findOne(id: string) {
    return this.prisma.performance.findUnique({
      where: { id },
      include: { member: true },
    });
  }

  update(id: string, dto: UpdatePerformanceDto) {
    return this.prisma.performance.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.performance.delete({
      where: { id },
    });
  }
}

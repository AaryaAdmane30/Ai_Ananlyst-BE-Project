// src/cost/cost.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';

@Injectable()
export class CostService {
  constructor(private prisma: PrismaService) {}

  async create(createCostDto: CreateCostDto) {
    return this.prisma.cost.create({
      data: createCostDto,
    });
  }

  async update(id: string, updateCostDto: UpdateCostDto) {
    return this.prisma.cost.update({
      where: { id },
      data: updateCostDto,
    });
  }
}
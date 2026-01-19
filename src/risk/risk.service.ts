// src/risk/risk.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming PrismaService is set up
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';

@Injectable()
export class RiskService {
  constructor(private prisma: PrismaService) {}

  async create(createRiskDto: CreateRiskDto) {
    return this.prisma.risk.create({
      data: createRiskDto,
    });
  }

  async update(id: string, updateRiskDto: UpdateRiskDto) {
    return this.prisma.risk.update({
      where: { id },
      data: updateRiskDto,
    });
  }
}
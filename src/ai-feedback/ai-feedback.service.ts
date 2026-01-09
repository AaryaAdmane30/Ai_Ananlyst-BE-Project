
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAiFeedbackDto } from './dto/create-ai-feedback.dto';
import { UpdateAiFeedbackDto } from './dto/update-ai-feedback.dto';

@Injectable()
export class AiFeedbackService {
  constructor(private prisma: PrismaService) {}

  async create(createAiFeedbackDto: CreateAiFeedbackDto) {
    return this.prisma.aiFeedback.create({
      data: createAiFeedbackDto,
    });
  }

  async update(id: string, updateAiFeedbackDto: UpdateAiFeedbackDto) {
    return this.prisma.aiFeedback.update({
      where: { id },
      data: updateAiFeedbackDto,
    });
  }
}
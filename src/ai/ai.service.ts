import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAiDto } from './dto/create-ai.dto';
import { UpdateAiDto } from './dto/update-ai.dto';


@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateAiDto) {
    return this.prisma.ai.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.ai.findMany();
  }

  findOne(id: string) {
    return this.prisma.ai.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateAiDto) {
    return this.prisma.ai.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.ai.delete({
      where: { id },
    });
  }
}

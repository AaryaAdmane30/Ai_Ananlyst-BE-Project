import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Skill } from '@prisma/client';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Skill[]> {
    return this.prisma.skill.findMany();
  }

  findOne(id: string): Promise<Skill | null> {
    return this.prisma.skill.findUnique({ where: { id } });
  }

  create(data: Prisma.SkillCreateInput): Promise<Skill> {
    return this.prisma.skill.create({ data });
  }

  update(id: string, data: Prisma.SkillUpdateInput): Promise<Skill> {
    return this.prisma.skill.update({ where: { id }, data });
  }

  remove(id: string): Promise<Skill> {
    return this.prisma.skill.delete({ where: { id } });
  }
}

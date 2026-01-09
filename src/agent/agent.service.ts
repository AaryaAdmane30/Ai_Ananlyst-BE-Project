
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentService {
  constructor(private prisma: PrismaService) {}

  async create(createAgentDto: CreateAgentDto) {
    return this.prisma.agent.create({
      data: createAgentDto,
    });
  }

  async update(id: string, updateAgentDto: UpdateAgentDto) {
    return this.prisma.agent.update({
      where: { id },
      data: updateAgentDto,
    });
  }
}
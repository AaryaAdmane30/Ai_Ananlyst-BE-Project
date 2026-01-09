// src/workflow-run/workflow-run.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkflowRunDto } from './dto/create-workflow-run.dto';
import { UpdateWorkflowRunDto } from './dto/update-workflow-run.dto';

@Injectable()
export class WorkflowRunService {
  constructor(private prisma: PrismaService) {}

  async create(createWorkflowRunDto: CreateWorkflowRunDto) {
    return this.prisma.workflowRun.create({
      data: createWorkflowRunDto,
    });
  }

  async update(id: string, updateWorkflowRunDto: UpdateWorkflowRunDto) {
    return this.prisma.workflowRun.update({
      where: { id },
      data: updateWorkflowRunDto,
    });
  }
}
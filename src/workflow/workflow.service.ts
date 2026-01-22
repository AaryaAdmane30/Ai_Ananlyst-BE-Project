import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateWorkflowRunDto } from "./dto/create-workflow-run.dto";
import { UpdateWorkflowRunDto } from "./dto/update-workflow-run.dto";

@Injectable()
export class WorkflowRunService {
  constructor(private prisma: PrismaService) {}

  async create(createWorkflowRunDto: CreateWorkflowRunDto) {
    return this.prisma.workflowRun.create({
      data: createWorkflowRunDto,
    });
  }

  async findAll() {
    return this.prisma.workflowRun.findMany({
      orderBy: { startedAt: "desc" },
      include: { epic: true }, // ✅ epic details show in UI
    });
  }

  async findOne(id: string) {
    return this.prisma.workflowRun.findUnique({
      where: { id },
      include: { epic: true },
    });
  }

  async update(id: string, updateWorkflowRunDto: UpdateWorkflowRunDto) {
    return this.prisma.workflowRun.update({
      where: { id },
      data: updateWorkflowRunDto,
    });
  }

  async remove(id: string) {
    return this.prisma.workflowRun.delete({
      where: { id },
    });
  }
}

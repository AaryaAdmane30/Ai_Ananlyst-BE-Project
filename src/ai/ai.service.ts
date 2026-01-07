import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  // Example: store AI suggestions for projects or tasks
  createSuggestion(data: Prisma.ProjectUpdateInput) {
    return this.prisma.project.update({ 
      where: { id: (data as any).id }, 
      data 
    });
  }

  calculateSavings(projectId: string) {
    // placeholder: here you can integrate AI logic later
    return this.prisma.project.findUnique({ where: { id: projectId } });
  }
}

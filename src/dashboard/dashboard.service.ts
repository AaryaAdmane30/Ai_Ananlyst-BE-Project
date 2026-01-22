import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getOverview(user: any) {
    const managerId = user?.id;

    const totalProjects = await this.prisma.project.count({
      where: { managerId },
    });

    const activeTasks = await this.prisma.task.count({
      where: {
        status: { not: "COMPLETED" },
        project: { managerId },
      },
    });

    const teamMembers = await this.prisma.teamMember.count({
      where: { managerId },
    });

    const unresolvedRisks = await this.prisma.risk.count({
      where: {
        resolved: false,
        project: { managerId },
      },
    });

    const recentProjects = await this.prisma.project.findMany({
      where: { managerId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        status: true,
      },
    });

    return {
      totalProjects,
      activeTasks,
      teamMembers,
      unresolvedRisks,
      recentProjects,
    };
  }
}

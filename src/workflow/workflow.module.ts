import { Module } from '@nestjs/common';
import { WorkflowRunController } from './workflow.controller';
import { WorkflowRunService } from './workflow.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], 
  controllers: [WorkflowRunController],
  providers: [WorkflowRunService],
})
export class WorkflowModule {}


import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { WorkflowRunService } from './workflow.service';
import { CreateWorkflowRunDto } from './dto/create-workflow-run.dto';
import { UpdateWorkflowRunDto } from './dto/update-workflow-run.dto';

@Controller('workflow')
export class WorkflowRunController {
  constructor(private readonly workflowRunService: WorkflowRunService) {}

  @Post()
  create(@Body() createWorkflowRunDto: CreateWorkflowRunDto) {
    return this.workflowRunService.create(createWorkflowRunDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkflowRunDto: UpdateWorkflowRunDto) {
    return this.workflowRunService.update(id, updateWorkflowRunDto);
  }
}
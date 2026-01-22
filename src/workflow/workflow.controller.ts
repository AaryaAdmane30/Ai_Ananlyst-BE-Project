import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Get,
  Delete,
} from "@nestjs/common";
import { WorkflowRunService } from "./workflow.service";
import { CreateWorkflowRunDto } from "./dto/create-workflow-run.dto";
import { UpdateWorkflowRunDto } from "./dto/update-workflow-run.dto";
import { JwtAuthGuard } from "../auth/auth/jwt.guard";

@Controller("workflow")
@UseGuards(JwtAuthGuard)
export class WorkflowRunController {
  constructor(private readonly workflowRunService: WorkflowRunService) {}

  @Post()
  create(@Body() createWorkflowRunDto: CreateWorkflowRunDto) {
    return this.workflowRunService.create(createWorkflowRunDto);
  }

  // ✅ GET ALL runs
  @Get()
  findAll() {
    return this.workflowRunService.findAll();
  }

  // ✅ GET SINGLE run
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.workflowRunService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateWorkflowRunDto: UpdateWorkflowRunDto
  ) {
    return this.workflowRunService.update(id, updateWorkflowRunDto);
  }

  // ✅ optional delete
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.workflowRunService.remove(id);
  }
}

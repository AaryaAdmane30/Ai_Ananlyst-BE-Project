import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowRunService } from './workflow.service';


describe('WorkflowService', () => {
  let service: WorkflowRunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowRunService],
    }).compile();

    service = module.get<WorkflowRunService>(WorkflowRunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

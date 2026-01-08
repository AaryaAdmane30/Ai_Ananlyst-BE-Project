import { Test, TestingModule } from '@nestjs/testing';
import { AiFeedbackController } from './ai-feedback.controller';

describe('AiFeedbackController', () => {
  let controller: AiFeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiFeedbackController],
    }).compile();

    controller = module.get<AiFeedbackController>(AiFeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

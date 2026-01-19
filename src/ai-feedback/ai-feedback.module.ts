import { Module } from '@nestjs/common';
import { AiFeedbackController } from './ai-feedback.controller';
import { AiFeedbackService } from './ai-feedback.service';

@Module({
  controllers: [AiFeedbackController],
  providers: [AiFeedbackService]
})
export class AiFeedbackModule {}

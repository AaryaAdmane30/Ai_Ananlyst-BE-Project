
import { PartialType } from '@nestjs/mapped-types';
import { CreateAiFeedbackDto } from './create-ai-feedback.dto';

export class UpdateAiFeedbackDto extends PartialType(CreateAiFeedbackDto) {}
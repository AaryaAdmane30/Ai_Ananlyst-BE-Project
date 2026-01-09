// src/ai-feedback/ai-feedback.controller.ts
import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { AiFeedbackService } from './ai-feedback.service';
import { CreateAiFeedbackDto } from './dto/create-ai-feedback.dto';
import { UpdateAiFeedbackDto } from './dto/update-ai-feedback.dto';

@Controller('ai-feedback')
export class AiFeedbackController {
  constructor(private readonly aiFeedbackService: AiFeedbackService) {}

  @Post()
  create(@Body() createAiFeedbackDto: CreateAiFeedbackDto) {
    return this.aiFeedbackService.create(createAiFeedbackDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAiFeedbackDto: UpdateAiFeedbackDto) {
    return this.aiFeedbackService.update(id, updateAiFeedbackDto);
  }
}
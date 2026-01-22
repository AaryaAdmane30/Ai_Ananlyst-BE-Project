import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EpicService } from './epics.service';
import { CreateEpicDto } from './dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto';

@Controller('epics')
export class EpicController {
  constructor(private service: EpicService) {}

  @Post()
  create(@Body() dto: CreateEpicDto) {
    return this.service.create(dto);
  }

  // ✅ dynamic filter support
  @Get()
  findAll(@Query("projectId") projectId?: string) {
    return this.service.findAllFiltered(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEpicDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

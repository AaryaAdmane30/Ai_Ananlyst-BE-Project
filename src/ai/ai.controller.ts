// import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
// import { AiService } from './ai.service';
// import { CreateAiDto } from './dto/create-ai.dto';
// import { UpdateAiDto } from './dto/update-ai.dto';

// @Controller('ai')
// export class AiController {
//   constructor(private service: AiService) {}

//   @Post()
//   create(@Body() dto: CreateAiDto) {
//     return this.service.create(dto);
//   }

//   @Get()
//   findAll() {
//     return this.service.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.service.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() dto: UpdateAiDto) {
//     return this.service.update(id, dto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.service.remove(id);
//   }
// }

import { Controller, Post, Body, Get, Patch, Param, Delete } from '@nestjs/common';
import { AiService } from './ai.service';
import { CreateAiDto } from './dto/create-ai.dto';
import { UpdateAiDto } from './dto/update-ai.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // === Separate routes for Python functions ===
  @Post('tasks')
  createTask(@Body() dto: CreateAiDto) {
    return this.aiService.create({ ...dto, type: 'task' });
  }

  @Post('skills')
  createSkill(@Body() dto: CreateAiDto) {
    return this.aiService.create({ ...dto, type: 'skill' });
  }

  @Post('risks')
  createRisk(@Body() dto: CreateAiDto) {
    return this.aiService.create({ ...dto, type: 'risk' });
  }

  @Post('cost')
  createCost(@Body() dto: CreateAiDto) {
    return this.aiService.create({ ...dto, type: 'cost' });
  }

  // === Optional: keep generic CRUD ===
  @Post()
  create(@Body() dto: CreateAiDto) {
    return this.aiService.create({ ...dto, type: 'generic' });
  }

  @Get()
  findAll() {
    return this.aiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAiDto) {
    return this.aiService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiService.remove(id);
  }
}

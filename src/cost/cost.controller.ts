
import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { CostService } from './cost.service';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';

@Controller('cost')
export class CostController {
  constructor(private readonly costService: CostService) {}

  @Post()
  create(@Body() createCostDto: CreateCostDto) {
    return this.costService.create(createCostDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCostDto: UpdateCostDto) {
    return this.costService.update(id, updateCostDto);
  }
}
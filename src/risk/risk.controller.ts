// src/risk/risk.controller.ts
import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { RiskService } from './risk.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';

@Controller('risk')
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @Post()
  create(@Body() createRiskDto: CreateRiskDto) {
    return this.riskService.create(createRiskDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskDto: UpdateRiskDto) {
    return this.riskService.update(id, updateRiskDto);
  }
}

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCostDto {
  @IsNumber()
  @IsOptional()
  laborCost?: number;

  @IsNumber()
  @IsOptional()
  reworkCost?: number;

  @IsNumber()
  @IsOptional()
  infrastructureCost?: number;

  @IsNumber()
  @IsOptional()
  otherCost?: number;

  @IsNumber()
  @IsOptional()
  totalCost?: number;

  @IsNumber()
  @IsOptional()
  savings?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  taskId?: string;

  @IsString()
  @IsOptional()
  epicId?: string;

  @IsString()
  @IsOptional()
  projectId?: string;

  @IsString()
  @IsOptional()
  aiId?: string;
}
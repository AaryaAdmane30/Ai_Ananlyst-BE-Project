// src/risk/dto/create-risk.dto.ts
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateRiskDto {
  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  severity?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  mitigation?: string;

  @IsBoolean()
  @IsOptional()
  resolved?: boolean;

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
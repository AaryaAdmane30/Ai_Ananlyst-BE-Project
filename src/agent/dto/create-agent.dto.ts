
import { IsString, IsOptional } from 'class-validator';

export class CreateAgentDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  version?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
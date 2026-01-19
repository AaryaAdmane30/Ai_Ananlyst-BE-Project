
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateAiFeedbackDto {
  @IsString()
  aiId: string;

  @IsBoolean()
  @IsOptional()
  approved?: boolean;

  @IsString()
  @IsOptional()
  comment?: string;
}
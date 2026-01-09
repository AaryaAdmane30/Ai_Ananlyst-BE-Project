
import { IsString, IsOptional } from 'class-validator';

export class CreateWorkflowRunDto {
  @IsString()
  epicId: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsOptional()
  logs?: any; // Json type, can be object

  @IsOptional()
  finishedAt?: Date;
}
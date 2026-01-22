import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeamMemberDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsNumber()
  availabilityHours?: number;

  @IsOptional()
  @IsNumber()
  currentWorkload?: number;

  @IsOptional()
  @IsNumber()
  hourlyRate?: number;

  @IsOptional()
  preferences?: Record<string, any>;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  managerId?: string;
}

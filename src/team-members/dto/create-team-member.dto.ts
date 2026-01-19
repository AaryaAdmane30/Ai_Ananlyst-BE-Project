import { Role } from '@prisma/client';

export class CreateTeamMemberDto {
  role: Role;  //  use Prisma enum
  availabilityHours?: number;
  currentWorkload?: number;
  hourlyRate?: number;
  preferences?: Record<string, any>;
  userId: string;
}

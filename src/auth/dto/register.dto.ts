import { Role } from '@prisma/client';

export class RegisterDto {
  name: string;
  email: string;
  password: string;
  role: Role;          // ADMIN, USER, etc.
  companyName?: string;
  contactInfo?: string;
}

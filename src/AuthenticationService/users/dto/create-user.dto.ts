// create-user.dto.ts
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: 'MANAGER' | 'DEVELOPER' | 'ADMIN';
  companyName?: string;
  contactInfo?: string;
}

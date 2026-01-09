import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;   // enum, not string
  projectId?: string;   
  epicId?: string;      
}

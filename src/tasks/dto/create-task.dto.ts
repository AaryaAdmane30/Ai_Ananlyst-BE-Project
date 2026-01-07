export class CreateTaskDto {
  title: string;
  description?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  epicId: string;
  assignedTo?: string; // team member ID
  dueDate?: Date;
}

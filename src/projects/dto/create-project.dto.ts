export class CreateProjectDto {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  teamMembers?: string[]; // array of team member IDs
}

export class CreateTeamMemberDto {

  role: string;
  // 1. Functional role of the team member
  //    Example: "Backend Developer", "Frontend Developer"

  availabilityHours?: number;
  
  currentWorkload?: number;
  

  hourlyRate?: number;
  

  preferences?: Record<string, any>;
  

  userId: string;
  
}

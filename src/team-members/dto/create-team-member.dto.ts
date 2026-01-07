export class CreateTeamMemberDto {
  role: string;              // e.g., "Backend Developer"
  availabilityHours?: number; // optional, defaults to 40
  currentWorkload?: number;   // optional, defaults to 0
  userId: string;            // REQUIRED — links to User
}

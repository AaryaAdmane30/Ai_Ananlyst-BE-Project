
export class CreateAiDto {
  projectId: string;

  laborCost?: number;
  reworkCost?: number;
  infrastructureCost?: number;
  totalSavings?: number;

  description?: string;
}

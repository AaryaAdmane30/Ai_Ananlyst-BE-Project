export class CreateAiDto {
  name: string;
  description?: string;
  inputData?: any; // JSON, file reference, etc.
  outputData?: any;
  createdBy?: string; // user ID
}

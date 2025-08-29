export interface AccountInfo {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LocationInfo {
  country: string;
  state?: string;
  city: string;
  address: string;
  zipCode: string;
  timezone?: string;
}

export interface FormData {
  account: AccountInfo;
  location: LocationInfo;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface FormState {
  currentStep: number;
  formData: Partial<FormData>;
  steps: FormStep[];
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export type StepKey = "account" | "location";

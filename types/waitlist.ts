export interface WaitlistFormData {
  name: string;
  email: string;
}

export interface WaitlistRequest extends WaitlistFormData {
  source: string;
}

export interface WaitlistResponse {
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    source: string;
    createdAt: string;
  };
}

export interface WaitlistValidationError {
  field: 'name' | 'email';
  message: string;
}

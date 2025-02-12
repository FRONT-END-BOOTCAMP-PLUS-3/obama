export type UserRole = "user" | "admin";

export interface SignUpFormState {
    email: string;
    password: string;
    passwordConfirm: string;
    birthDate: string;
    name: string;
    phone: string;
  }
  
  export interface PhoneSegments {
    first: string;
    second: string;
    third: string;
  }
  
  export interface FormErrors {
    email?: string;
    password?: string;
    passwordConfirm?: string;
    birthDate?: string;
    name?: string;
    phone?: string;
    verificationCode?: string;
  }
  
  export interface SignUpRequest {
    email: string;
    password: string;
    birthDate: string;
    name: string;
    phone: string;
  }
  
  export interface SignUpProps {
    formState: SignUpFormState;
    errors: FormErrors;
    phoneSegments: PhoneSegments;
    verificationCode: string;
    isDuplicated: boolean;
    isVerified: boolean;
    isLoading: boolean;
    isFormValid: boolean;

    handleFormChange: (name: string, value: string) => void;
    handlePhoneChange: (segment: keyof PhoneSegments, value: string) => void;
    handleDuplicateEmail: () => Promise<void>;
    handleVerificationCodeChange: (name: string, value: string) => void;
    handleSubmitVerificationCode: () => Promise<void>;
    sendEmail: () => Promise<void>;
    getFieldState: (value: string, errorMessage?: string) => "default" | "error" | "current";
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleCancel:() => Promise<void>;
    resetField: (field:keyof SignUpFormState ) => void;
  }
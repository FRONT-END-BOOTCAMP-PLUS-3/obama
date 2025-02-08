export interface TextFieldProps {
  className?: string;
  children?: React.ReactNode;
  name: string;
 
  value?: string | number;
  type?: "text" | "password" | "number" | "email" | "date";
  size?: "L" | "M" | "S" | "XL";
  state?: "default" | "current" | "error";
  autoFocus?: boolean;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  onChange?: (name: string, value: string) => void;
  onFocus?: (name: string, value: string) => void;
  onBlur?: (name: string, value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

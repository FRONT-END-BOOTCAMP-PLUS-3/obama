export interface TextFieldProps {
  className?: string;
  children?: React.ReactNode;
  name: string;
  maxLength?: number;
  value?: string | number;
  type?: "text" | "password" | "number" | "email";
  size?: "L" | "M" | "S";
  state?: "default" | "current" | "error";
  autoFocus?: boolean;
  placeholder?: string;
  onChange?: (name: string, value: string) => void;
  onFocus?: (name: string, value: string) => void;
  onBlur?: (name: string, value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

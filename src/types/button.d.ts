export type ButtonSize = "s" | "m" | "l";
export type ButtonVariant = "contained" | "line";

export interface ButtonProps extends React.ButtonHTMLAttributes <HTMLButtonElement> {
    size?: ButtonSize;
    variant?: ButtonVariant;
    className? : string;
    children?: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
}
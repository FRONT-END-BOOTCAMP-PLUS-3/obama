import { ButtonProps } from "@/types/button";
import BaseButtonStyled from "./Button.Styled";

const Button : React.FC<ButtonProps> = ({
    size = "m",
    variant = "contained",
    isLoading = false,
    disabled = false,
    children,
    ...props
})=> {
    return (
        <BaseButtonStyled
        size={size}
        variant={variant}
        disabled={disabled || isLoading}
        {...props}
        >
            {isLoading ? "Loding..." : children }
        </BaseButtonStyled>

    );
}

export default Button;
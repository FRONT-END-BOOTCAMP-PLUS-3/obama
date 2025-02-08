import { ButtonSize, ButtonVariant } from "@/types/button";
import styled, { css } from "styled-components";
import { sizeStyles, variantStyles } from "./styles";

/* Button styled component */
export const BaseButtonStyled = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
}>`
/* 공통 스타일 적용 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    padding: 0.5rem 1rem;
    line-height: 1.4;
    font-size: var(--font-size-sm);
    font-weight: bold;
    border-radius: 3.125rem;
    border: 1px solid var(--primary-color);
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.1rem;

  /* size에 따른 width 설정*/
  ${({ size }) => css`
    width: ${sizeStyles[size]};
  `}

  /* variant에 따른 스타일 */
    ${({ variant }) => variantStyles[variant]}
`;


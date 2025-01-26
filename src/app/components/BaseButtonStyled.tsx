
import styled,{ css } from "styled-components"

import type { ButtonVariant, ButtonSize } from "@/types/button"; 
const sizeStyles: Record<ButtonSize, string> = {
    s: "5.625rem",
    m: "8.75rem",
    l: "20rem",
};

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
    contained: css`
        background-color: var(--primary-color);
        color: var(--white-color);
        border: 1px solid var(--primary-color);
        

        &:hover {
            background-color: var(--hover-color);
            border-color: var(--hover-color);
        }

        &:active {
            background-color: var(--active-color);
            border-color: var(--active-color)
        }

        &:disabled{
            background-color: var(--gray-200);
            border-color: var(--gray-200);
            cursor: not-allowed;
        }
    `,
    line: css`
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);

    &:hover {
        border-color: var(--hover-color);
        color: var(--hover-color)
    }

    &:active {
        border-color: var(--active-color);
        color: var(--active-color)
    }

    &:disabled{
        background-color: var(--gray-200);
        border-color: var(--gray-200);
        cursor: not-allowed;
    }
    `,
};

/* Button styled component */
const BaseButtonStyled = styled.button<{
    variant: ButtonVariant; 
    size: ButtonSize;
}>`
/* 공통 스타일 적용용 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    padding: 0.625rem 1.25rem;
    font-weight: bold;
    border-radius: 50%;
    border: 1px solid var(--primary-color);
    cursor: pointer;
    transition: all 0.3s ease;

    /* size에 따른 width 설정*/
    ${({size}) => css`
        width: ${sizeStyles[size]};
    `}

    /* variant에 따른 스타일 */
    ${({variant}) => variantStyles[variant]}
`

export default BaseButtonStyled;
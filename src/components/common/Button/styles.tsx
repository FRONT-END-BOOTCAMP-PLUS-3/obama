import { css } from "styled-components";
import type { ButtonVariant, ButtonSize } from "@/types/button"; 

export const sizeStyles: Record<ButtonSize, string> = {
    s: "90px",
    m: "140px",
    l: "320px",
};

export const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
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
        color: var(--white-color);
        cursor: not-allowed;
    }
    `,
};

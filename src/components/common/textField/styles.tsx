import { css } from "styled-components";

export const sizeStyles = {
  L: css`
    width: 320px;
    height: 2.5rem;
  `,
  M: css`
    width: 220px;
    height: 2.5rem;
  `,
  S: css`
    width: 90px;
    height: 2.5rem;
    padding: 0.625rem;
  `,
  XL: css` 
  width: 540px;
  height: 2.5rem;
`,
};

export const stateStyles = {
  default: css`
    border: 1px solid var(--gray-600);
    background: var(--white-color);
  `,
  current: css`
    border: 1px solid var(--primary-color);
    background: var(--white-color);
  `,
  error: css`
    border: 1px solid var(--error-color);
    background: var(--white-color);
  `,
};

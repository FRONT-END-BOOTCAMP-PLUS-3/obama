import { css } from "styled-components";

export const sizeStyles = {
  L: css`
    width: 20rem;
    height: 2.5rem;
  `,
  M: css`
    width: 13.75rem;
    height: 2.5rem;
  `,
  S: css`
    width: 5.625rem;
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

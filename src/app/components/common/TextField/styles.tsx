import { css } from "styled-components";

export const sizeStyles = {
  L: css`
    width: 320px;
    height: 50px;
  `,
  M: css`
    width: 220px;
    height: 40px;
  `,
  S: css`
    width: 90px;
    height: 30px;
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

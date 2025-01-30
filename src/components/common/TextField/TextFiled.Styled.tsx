import styled from "styled-components";
import { sizeStyles, stateStyles } from "./styles";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  .textfield-label {
    font-size: var(--font-size-md);
    color: var(--black-color);
  }
`;

export const StyledInput = styled.input<{
  size: "L" | "M" | "S";
  state: "default" | "current" | "error";
}>`
  box-sizing: border-box;
  padding: 1.25rem;
  border-radius: 3.125rem;
  font-size: var(--font-size-md);

  ${({ size }) => sizeStyles[size]}
  ${({ state }) => stateStyles[state]}

  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

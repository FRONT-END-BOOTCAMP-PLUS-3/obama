import styled from "styled-components";
import { sizeStyles, stateStyles } from "./styles";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .textfield-label {
    font-size: var(--font-size-md);
    color: var(--black-color);
    font-family: var(--font-family-pretendard);
  }
`;

export const StyledInput = styled.input<{
  size: "L" | "M" | "S";
  state: "default" | "current" | "error";
}>`
  box-sizing: border-box;
  padding: 20px;
  border-radius: 50px;
  font-family: var(--font-family-pretendard);
  font-size: var(--font-size-md);

  ${({ size }) => sizeStyles[size]}
  ${({ state }) => stateStyles[state]}

  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

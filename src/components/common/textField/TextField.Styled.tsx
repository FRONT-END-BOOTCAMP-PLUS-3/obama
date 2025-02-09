import styled from "styled-components";
import { sizeStyles, stateStyles } from "@/components/common/textField/styles";

export const StyledWrapper = styled.div`
  display: inline-flex;

  .textfield-label {
    font-size: var(--font-size-md);
    color: var(--black-color);
  }

`;

export const StyledInput = styled.input<{
  size: "L" | "M" | "S" | "XL" | "XXL";
  state: "default" | "current" | "error";
}>`
  box-sizing: border-box;
  padding: 1.25rem;
  border-radius: 3.125rem;
  font-size: var(--font-size-md);

  ${({ size }) => sizeStyles[size]}
  ${({ state }) => stateStyles[state]}

  &:focus {
     border-color: ${({ state }) =>
      state === "error" ? "var(--error-color)" : "var(--primary-color)"};
   
  }

  &::placeholder {
    text-align: ${({ size }) => (size === "S" ? "center" : "left")};
  }
`;

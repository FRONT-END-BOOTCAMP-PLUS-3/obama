import styled from "styled-components";

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem;
  background-color: var(--white-color);
`;

export const ActionButton = styled.button<{ $variant: "contained" | "line" }>`
  background-color: ${(props) =>
    props.$variant === "contained" ? "var(--primary-color)" : "transparent"};
  border: ${(props) =>
    props.$variant === "line" ? "1px solid var(--primary-color)" : "none"};
  color: ${(props) =>
    props.$variant === "contained"
      ? "var(--white-color)"
      : "var(--primary-color)"};
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
`;

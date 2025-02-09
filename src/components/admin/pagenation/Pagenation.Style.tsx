import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem; 
  margin-bottom: 3rem;
`;

export const PageButton = styled.button<{ $isActive: boolean }>`
  width: 1.875rem;
  height: 1.625rem;
  margin: 0 0.313rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  background-color: ${({ $isActive }) => ($isActive ? "var(--primary-color)" : "var(--white-color)")};
  color: ${({ $isActive }) => ($isActive ? "var(--white-color)" : "var(--black-color)")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--hover-color);
    color: var(--white-color);
    border: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

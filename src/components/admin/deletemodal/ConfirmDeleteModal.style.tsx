import styled from "styled-components";

export const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(64, 64, 64, 0.7); 
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: var(--white-color);
  border-radius: 0.625rem;
  width: 21.875rem;
  padding: 2rem;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  font-size: var(--font-size-base);
  margin-bottom: 1.25rem;
  color: var(--black-color);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.25rem;
`;

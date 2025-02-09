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
  z-index: 100;
`;

export const ModalContainer = styled.div`
  width: 37.5rem;
  background: var(--white-color);
  border-radius: 0.625rem;
  padding: 1.875rem;
  position: relative;
`;

export const Header = styled.h4`
  font-size: var(--font-size-xl);
  margin-bottom: 1rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.625rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  cursor: pointer;
`;

export const InputFieldContainer = styled.div`
  margin: 1rem 0; 
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.label`
  font-size: var(--font-size-base);
  margin-bottom: 0.5rem;
  display: block;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; 
  margin-top: 1.5rem; 
`;



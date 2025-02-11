import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: flex-end; 
  z-index: 500;
`;

export const ModalContainer = styled.div`
  background: var(--white-color);
  width: 100%;
  height: 15.625rem;
  border-radius: 1.25rem 1.25rem 0 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  transition: transform 0.3s ease-in-out;
  position: relative; 
`;

export const Divider = styled.div`
  width: 2.25rem; 
  height: 0.188rem; 
  background-color: var(--gray-200); 
  border-radius: 0.125rem; 
  position: absolute;
  top: 1.125rem;
  margin-bottom: 4.125rem;
`;

export const Message = styled.p`
  font-size: var(--font-size-lg);
  margin-bottom: 1.625rem;
`;


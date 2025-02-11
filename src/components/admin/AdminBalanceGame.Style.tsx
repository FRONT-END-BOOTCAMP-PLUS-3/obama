import styled from "styled-components";

export const Icon = styled.img`
  width: 3rem; 
  height: 3rem;
  cursor: pointer;
  margin: 0 auto;
`;


export const AddButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 3rem;
  width: 3.5rem;
  height: 3.5rem;
  background-color: var(--primary-color);
  color: white;
  font-size: 1.75rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-dark-color);
  }
`;

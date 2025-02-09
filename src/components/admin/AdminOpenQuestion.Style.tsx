import styled from "styled-components";


export const Icon = styled.img`
  width: 1.563rem; 
  height: 1.563rem;
  cursor: pointer;
  margin: 0 auto;
`;

export const AddButton = styled.button`
  position: fixed;
  bottom: 0.625rem;
  right: 2.5rem;
  background-color: var(--primary-color);
  color: var(--white-color);
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  font-size: 1.75rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: var(--hover-color);
  }
`;

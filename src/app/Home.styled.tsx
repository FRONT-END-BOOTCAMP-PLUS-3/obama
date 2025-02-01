import styled from "styled-components";

export const TextContainer = styled.div`
  color: var(--gray-700);
  text-align: center;
  display: flex; 
  flex-direction: column; 
  align-items: center;
  margin-bottom: 0;
  margin-top: 5rem;
`;

export const TitleRow = styled.div`
  display: flex; 
  align-items: center; 
  justify-content: center; 
`;

export const SubTitleText = styled.h4`
  font-weight: 100; 
  &.bold {
    font-weight: 600;
  }
`;

export const Title = styled.h1`
  color: var(--primary-color);
  font-size: 5rem;
`;


export const Line = styled.div`
  width: 7.625rem;
  height: 0.0625rem;
  background-color: var(--gray-700);
  margin-left: 0.5rem;
  margin-top: -1rem; 
`;


export const IconContainer = styled.div`
  margin-top: 3.56rem;
  margin-right: 2.875rem; 
  align-self: flex-end; 
  `;

export const ButtonWrapper = styled.div`
  margin-top: 3rem; 
  `;


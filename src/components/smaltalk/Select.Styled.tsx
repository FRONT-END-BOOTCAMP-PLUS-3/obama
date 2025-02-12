import styled from "styled-components";

export const Title = styled.h2`
  margin-top: 2rem;
  margin-bottom: 3rem;
  color: var(--black-color);
`

export const SuggestExplain = styled.p`
  color:var(--black-color);
  text-align: center;
  margin-bottom: 4rem;
`

export const Question = styled.h5`
  color: var(--black-color);
  margin-bottom: 4rem;

`

export const ButtonWrapper = styled.div<{ $isHidden: boolean }>`
  margin-top: 4rem; 
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  width: 100%; 
  padding-right: 1rem; 
  opacity: ${({ $isHidden }) => ($isHidden ? "0" : "1")};
`;
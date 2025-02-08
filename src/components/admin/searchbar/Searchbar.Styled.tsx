import styled from "styled-components";
import TextField from "@/components/common/textField/TextField"; 
import Button from "@/components/common/button/Button"; 

export const SearchBarWrapper = styled.div`
  background-color: var(--gray-100);
  width: 52rem;
  height: 6.875rem;
  margin-left: 18rem;
  margin-top: 5rem;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;



export const SearchButton = styled(Button)`
  margin-right: 3.125rem;
`;

export const DropdownContainer = styled.div`
  margin-right: 1rem; 
  display: flex;
  align-items: center;
  margin-left : 3rem;
`;
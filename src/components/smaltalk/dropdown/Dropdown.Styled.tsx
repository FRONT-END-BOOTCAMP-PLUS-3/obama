import styled from "styled-components";
import { StyledItemProps } from "@/types/dropdown";

export const DropdownWrapper = styled.div<{ size: "default" | "small" }>`
  position: relative;
  width: ${({ size }) => (size === "small" ? "176px" : "15.625rem")};
  height: ${({ size }) => (size === "small" ? "40px" : "2.5rem")};
`;

export const StyledButton = styled.button<{ size: "default" | "small" }>`
  position: relative;
  width: 100%;
  padding: ${({ size }) => (size === "small" ? "0.5rem" : "0.625rem")};
  border: 0.0625rem solid var(--primary-color);
  border-radius: 1.875rem;
  background: var(--white-color);
  cursor: pointer;
  text-align: left;

  &:hover {
    border: 0.0625rem solid var(--hover-color);
  }
  &:active {
    border: 0.0625rem solid var(--active-color);
  }
`;


export const DropdownArrow = styled.img`
  position: absolute;
  right: 1rem; 
  top: 50%;
  transform: translateY(-50%);
`;


export const StyledMenu = styled.ul`
  position: static;
   left: 0;
   margin-top: 0.3125rem;
   width: 100%;
   background: var(--white-color);
   border: 0.0625rem solid var(--gray-100); 
   border-radius: 1.875rem; 
   list-style: none;
   overflow-y: auto;
   z-index: 10;
   &::-webkit-scrollbar {
     width: 6px;
   }
   &::-webkit-scrollbar-thumb {
     background-color: var(--gray-300);
     border-radius: 1rem;
   }
`;


export const StyledItem = styled.li<StyledItemProps>`
  padding: 0.625rem; 
  cursor: pointer;

  &:hover {
    background: var(--hover-color);
    color: var(--white-color);
    border-radius: ${({ $isFirst, $isLast }) =>
      $isFirst
        ? "1.875rem 1.875rem 0 0" 
        : $isLast
        ? "0 0 1.875rem 1.875rem" 
        : "0"};
  }
  border: 0.03125rem solid var(--gray-100); 
  &:active{
    background: var(--active-color);
    color: var(--white-color);
  }
`;

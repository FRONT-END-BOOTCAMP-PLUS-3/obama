import styled from "styled-components";

export const MBTIButton = styled.button<{ selected: boolean }>`
  width: 5rem;
  height: 5rem;
  border-radius: 0.9375rem;
  font-size: 1rem;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.1rem;
  text-align: center;
  font-family: "Noto Sans";
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid var(--gray-700);
  background-color: ${({ selected }) =>
    selected ? "var(--primary-700)" : "#fff"};
  color: ${({ selected }) =>
    selected
      ? "var(--Foundation-Grey-grey-50, #F5F5F5)"
      : "var(--Foundation-Grey-grey-700, #6D6D6D)"};
  &:hover {
    border-color: var(--gray-500);
  }
`;

import styled from "styled-components";

export const MBTIButton = styled.button<{ selected: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid;
  background-color: ${({ selected }) => (selected ? "#5FA6B6" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#666")};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: ${({ selected }) => (selected ? "#5FA6B6" : "#999")};
  }
`;

import styled from "styled-components";

export const TableWrapper = styled.div`
  margin-top: 3rem;
  margin-left: 18rem;
`;

export const Table = styled.table`
  width: 52rem;
  border-collapse: collapse;
  border:none;
`;

export const UserHeader = styled.th`
  background-color: var(--primary-color);
  height: 3rem;
  text-align: center;
  border-bottom: 1px solid var(--gray-100);
  width: auto;
`

export const UserCell = styled.td`
  padding: 0.625rem;
  border-bottom: 1px solid var(--gray-100);
  text-align: center;
  width :auto ;
`

export const TableHeader = styled.th`
  background-color: var(--primary-color);
  height: 3rem;
  text-align: center;
  border-bottom: 1px solid var(--gray-100);

  &:nth-child(1) {
    width: 10%; 
  }

  &:nth-child(2) {
    width: 70%; 
  }

  &:nth-child(3),
  &:nth-child(4) {
    width: 10%; 
  }
`;

export const TableCell = styled.td`
  padding: 0.625rem;
  border-bottom: 1px solid var(--gray-100);
  text-align: center; 

  &:nth-child(1) {
    width: 10%;
  }

  &:nth-child(2) {
    width: 70%; 
  }

  &:nth-child(3),
  &:nth-child(4) {
    width: 10%; 
  }
`;
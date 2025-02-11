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


export const TableHeader = styled.th`
    background-color: var(--primary-color);
  height: 3rem;
  text-align: center;
  border-bottom: 1px solid var(--gray-100);
  width: auto;
`;

export const TableCell = styled.td`
   padding: 0.625rem;
  border-bottom: 1px solid var(--gray-100);
  text-align: center;
  width :auto ;
`;
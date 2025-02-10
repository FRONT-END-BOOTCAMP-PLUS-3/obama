import styled from "styled-components";

export const Table = styled.table`
  margin-left: 18rem;
  width: 52rem;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: white;
`;

export const TableHeader = styled.th`
  background-color: var(--primary-color);
  color: white;
  text-align: center;
  padding: 1rem;
  border: 1px solid var(--gray-200);

  &:nth-child(1),
  &:nth-child(5),
  &:nth-child(6) {
    width: 8%; /* ID, 수정, 삭제 열의 너비 조정 */
  }
`;

export const TableCell = styled.td`
  text-align: center;
  padding: 0.75rem;
  border: 1px solid var(--gray-200);

  &:nth-child(1),
  &:nth-child(5),
  &:nth-child(6) {
    width: 8%; /* ID, 수정, 삭제 열의 너비 조정 */
  }
`;

export const InputField = styled.input`
  width: 95%;
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  border-radius: 4px;
`;

export const Icon = styled.img`
  width: 1.563rem;
  height: 1.563rem;
  cursor: pointer;
  margin: 0 auto;
`;

export const AddButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  background-color: var(--primary-color);
  color: white;
  font-size: 1.5rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-dark-color);
  }
`;

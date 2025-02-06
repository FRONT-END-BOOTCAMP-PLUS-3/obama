import styled from "styled-components";

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 20px;
  background-color: var(--primary-50);
  border-radius: 12px;
`;

export const SectionTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: bold;
  margin-bottom: 10px;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--gray-200);
`;

export const Label = styled.span`
  font-size: var(--font-size-base);
  color: var(--gray-700);
`;

export const Value = styled.span`
  font-size: var(--font-size-base);
  color: var(--black-color);
`;

export const ToggleButton = styled.button<{ $isPublic: boolean }>`
  font-size: var(--font-size-sm);
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) =>
    props.$isPublic ? "var(--success-color)" : "var(--error-color)"};
  color: var(--white-color);
  cursor: pointer;
`;

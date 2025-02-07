import styled from "styled-components";

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rems;
  background-color: var(--primary-50);
  border-radius: 0.9rem;
`;

export const SectionTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: bold;
  margin-bottom: 0.7rem;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 0;
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
  padding: 0.5rem 0.6rem;
  border: none;
  border-radius: 0.4rem;
  background-color: ${(props) =>
    props.$isPublic ? "var(--success-color)" : "var(--error-color)"};
  color: var(--white-color);
  cursor: pointer;
`;

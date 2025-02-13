import styled from "styled-components";

export const AboutMeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  align-self: center;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr; /* Label | Value */
  align-items: center;
  gap: 1rem;
  padding: 0.1rem;
`;

export const CategoryName = styled.span`
  font-size: var(--font-size-sm);
  color: var(--primary-700);
  font-weight: bold;
  text-align: center;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: anywhere;
  max-width: 9rem;
   pading: 0.3rem;
`;

export const Answer = styled.span`
  font-size: var(--font-size-sm);
  text-align: center;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: anywhere;
  color: var(--gray-700);
  max-width: 15rem;
   pading: 0.3rem;
`;

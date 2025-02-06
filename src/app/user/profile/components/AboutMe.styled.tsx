import styled from "styled-components";

export const AboutMeWrapper = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: var(--font-size-lg);
  text-align: center;
  padding-top: 1rem;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  margin: 0.5rem;
  gap: 1rem;
`;

export const Label = styled.span`
  font-size: var(--font-size-base);
  font-weight: bold;
  text-align: center;
  word-break: keep-all;
  color: var(--black-color);
`;

export const Value = styled.span`
  font-size: var(--font-size-base);
  text-align: center;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: anywhere;
  color: var(--gray-700);
`;

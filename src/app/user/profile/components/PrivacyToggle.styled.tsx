import styled from "styled-components";

export const SettingsWrapper = styled.div`
  padding: 1rem .7rem 0rem .7rem;
  background-color: var(--white-color);
  width: 100%;
`;

export const SettingItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr auto; /* Label | Value | Toggle */
  align-items: center;
  padding: 0.3rem;
  gap: 1rem;
`;

export const Label = styled.span`
  font-size: var(--font-size-sm);
  font-weight: bold;
  text-align: center;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: anywhere;
  max-width: 150px; 
`;

export const Value = styled.span`
  font-size: var(--font-size-sm);
  text-align: center;
  white-space: normal;
  word-break: keep-all; 
  overflow-wrap: anywhere;
  color: var(--gray-700);
  max-width: 250px;
`;


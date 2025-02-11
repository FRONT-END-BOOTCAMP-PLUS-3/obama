import styled from "styled-components";

export const AboutMeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  align-self: center;
`;

export const Item = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;


export const CategoryName = styled.span`
  font-size: 1rem;
  margin-right: 0.5rem;
  word-break: break-all;
  overflow-wrap: break-word;
`;

export const Answer = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #222;
  word-break: break-all;
  overflow-wrap: break-word;
`;

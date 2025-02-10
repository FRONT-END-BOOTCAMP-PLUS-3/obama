import styled from "styled-components";

export const InfoItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  height: fit-content;
`;

export const InfoLayer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: fit-content;
  align-items: center;
  justify-content: space-between;
`;

export const InfoTitle = styled.h6`
  display: inline-flex;
  width: 100%;
  margin: 0 1rem;
`;

export const InfoText = styled.p`
  display: inline-flex;
  margin: 0 1rem;
  word-wrap: break-word;
  white-space: pre-line;
`;

export const IconLayer = styled.span`
  display: inline-flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

export const SelectedSectionLayer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;

`;

export const SubjectLayer = styled.div`
  display: flex;
  flex-direction:column;
`;
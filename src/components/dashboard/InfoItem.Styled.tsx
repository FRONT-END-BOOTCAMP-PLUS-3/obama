import styled from "styled-components";

export const InfoItemWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
  height: fit-content;
`;

export const InfoLayer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  height: fit-content;
  align-items: center;
  justify-content: space-between;
`;

export const InfoTitle = styled.h6`
  display: flex;
  width: 100%;
  margin: 0;
`;

export const InfoText = styled.p`
  display: flex;
  width: 100%;
  margin: 0;
  word-wrap: break-word;
  white-space: pre-line;
`;

export const IconLayer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

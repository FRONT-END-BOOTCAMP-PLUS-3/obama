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
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding:0 1rem;
 
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

export const IconLayer = styled.span<{ $isEdit:boolean }>`
  display: inline-flex;
  align-items: center;
  align-self: ${({$isEdit})=> $isEdit? "end" : "center" };
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

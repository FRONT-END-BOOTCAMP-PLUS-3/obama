import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
    width: 100%;

`;

export const SectionContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
`;


export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

export const LoginMessage = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 16px;
`;

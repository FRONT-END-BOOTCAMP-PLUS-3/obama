import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;


export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
    width: 100%;


`;

export const SectionContainer = styled.div`
  width: 100%;
  height: 100vh;  // ✅ min-height → height로 변경하여 정확히 100vh 크기 유지
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

import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;\
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none; /* Firefox */
  
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

export const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-center;
  scroll-snap-align: start;
`;

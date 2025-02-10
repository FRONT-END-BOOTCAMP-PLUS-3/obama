import styled from "styled-components";


export const DashBoardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
  padding: 1rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem 0;
  border-bottom: 1.5px solid var(--primary-color);
`;

export const Title = styled.h4`
  display: block;
  margin: 0 1rem;
`;

export const InfoSection = styled.section`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  max-height: 37.5rem;
  height: fit-content;
  gap: 1rem;

  padding-bottom: 1rem;
  border-bottom: 1.5px solid var(--primary-color);
  overflow-y: scroll;
`;



export const AccountWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    
`;

export const AccountButtonLayer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    margin: 0.5rem 1.25rem;
    gap: 1.25rem;
    
    
`;

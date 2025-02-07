import styled from "styled-components";

export const Title = styled.h2`
    margin-top: 3.5rem;
`;

export const SignUpWrapper = styled.form`
  width: 320px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:1.875rem;

  p {
    margin: 0.375rem 0 0 0.625rem;
    font-size: var(--font-size-sm);
  }

`;

export const SectionEmailLayer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap:wrap;
  align-items: center;
  justify-content: space-between;

`;

export const VerifyCodeButtonLayer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between; 
`;

export const SectionPasswordLayer = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
& > *:first-child {
    margin-bottom: 1.25rem;
  }
`;

export const SectionPhoneLayer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .hyphen{
        width: 10px; 
        height: 2px; 
        background-color: var(--gray-600);
        display: inline-flex;
        border-radius: 1.25rem;
    }
`;
export const SectionButtonLayer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;

 

`
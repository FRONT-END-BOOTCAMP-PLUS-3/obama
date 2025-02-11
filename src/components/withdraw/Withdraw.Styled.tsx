import styled from "styled-components";

export const WithdrawWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: start;

    padding: 0 2rem;
    gap: 2rem;
`;

export const Title = styled.h2`
    display: flex;
    justify-self: start;
    text-align: left;
    word-wrap: break-word;
    white-space: pre-line;
    margin: 3rem;
`;

export const Caption = styled.p`
    font-size: var(--font-size-md);
    text-align: left;
    word-wrap: break-word;
    white-space: pre-line;
    
`;

export const PasswordLayer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

`;

export const WithdrawButtonLayer = styled.div`
    display: flex;
    align-items: center;
`;
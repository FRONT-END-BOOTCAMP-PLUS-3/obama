import styled from "styled-components";

export const Caption = styled.p`
    display: block;
    white-space: pre-line;
    word-wrap: break-word;
    margin-top: -4rem;
    
    color: var(--gray-800);
    font-size: var(--font-size-sm);

`

export const ResultSection = styled.div`

    display: flex;
    /* flex-wrap: wrap; */
    flex-direction: column;
    padding: 2rem;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 12rem;
    border-radius:30px;
    border: 1.2px solid var(--primary-color);
    gap:0.625rem;
    
`

export const ResultSubject = styled.p`
    font-size: var(--font-size-md);
    margin-bottom: 0;
    
`;

export const ResultBody = styled.p`
    font-weight: bold;
    font-size: var(--font-size-lg);
    margin-bottom: 0;
`
export const ResultCaption = styled.p`
    font-size: var(--font-size-xs);
    margin-bottom: 0;
    color: var(--gray-600);
    white-space: pre-line;
    word-wrap: break-word;
`;
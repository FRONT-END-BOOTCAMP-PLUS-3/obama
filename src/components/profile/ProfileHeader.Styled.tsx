import styled from "styled-components";

export const HeaderWrapper = styled.div`
 display: flex;
 width: 100%;
 height: 100%;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, hsl(205, 86.7%, 94.1%), #ffffff);
  padding: 2rem;
`;

export const ImageWrapper = styled.div`
  margin-bottom: 1rem;
  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    object-fit: cover;
    border: 0.3rem solid var(--primary-color);
  }
`;

export const Name = styled.h1`
  font-size: 1.5rem;
  color: var(--black-color);
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;


export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--gray-700);
  border-radius: 2rem;
  padding: .5rem;
  box-shadow: 0px 2px 4px rgba(17, 13, 13, 0.1);
  gap: 1rem;
`;

export const Label = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: var(--white-color);
`;

export const Value = styled.span`
  font-size: 1rem;
  color: var(--white-color);
`;

// export const SNSWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   gap: 0.5rem;
//   flex-wrap: wrap; /* 아이템이 줄 바꿈됨 */
//   margin-top: 1rem;
// `;

// export const SNSButton = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: var(--gray-700);
//   border-radius: 1rem;
//   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
//   padding: 0.5rem 1rem;
//   color: var(--white-color);
//   cursor: pointer;
// `;

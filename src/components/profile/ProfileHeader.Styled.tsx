import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg,hsl(205, 86.70%, 94.10%), #ffffff);
  margin: 0; /* 상단/하단 여백 제거 */
`;

export const ImageWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const Name = styled.h1`
  font-size: var(--font-size-lg);
  color: var(--black-color);
  margin-bottom: 1rem;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  gap: 0.7rem;
  width: 100%;
`;

export const Info = styled.div`
  display: flex;
  justify-content: center;
`;

export const InfoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  border-radius: 3rem;
  background-color: #f0f8ff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 24rem;
  gap: 0.7rem;
`;

const Label = styled.span`
  font-size: var(--font-size-sm);
  font-weight: bold;
  color: #555;
`;

const Value = styled.span`
  font-size: var(--font-size-sm);
  color: var(--black-color);
`;

const SNSWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: .5rem;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.2rem;
`;

const SNSLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SNSButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-700);
  border-radius: 3rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.4rem 1rem;
  gap: 0.5rem;
  width: 100%;
  cursor: pointer;
`;

const SNSId = styled.span`
  font-size: var(--font-size-sm);
  color: var(--white-color);
  text-align: center;
`;
export { Label, SNSWrapper, Value, SNSLink, SNSButton, SNSId };

import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem;  // ✅ 기존 2rem에서 0으로 변경 (상단 여백 제거)
  margin: 0;  // ✅ 추가 (불필요한 여백 제거)
  flex-direction: column;
  align-items: center;
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
  font-size: 2rem;
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
  border-radius: 1.5rem;
  padding: .5rem;
  box-shadow: 0px 2px 4px var(--gray-900);
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
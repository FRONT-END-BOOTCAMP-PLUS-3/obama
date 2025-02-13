import styled from "styled-components";

export const ProfileImage = styled.img`
  width: 5.25rem; /* 180px -> 11.25rem */
  height: 5.25rem;
  object-fit: cover;
  border-radius: 50%;
  /* Applied after image upload */
  &:not([src="/icons/profilePicture.svg"]) {
    width: 100%;
    height: 100%;
  }
`;

export const ImageWrapper = styled.div`
  margin-top: 1rem;
  position: relative; /* 부모 요소에 position: relative 추가 */
  width: 6.25rem; /* 280px / 16 = 17.5rem */
  height: 6.25rem;
  border-radius: 50%;
  border: 2px solid var(--primary-500); /* 글로벌 CSS에서 primary-500 색상 사용 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
`;

export const TitleWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: start;
  padding: 1.25rem 0;
  border-bottom: 1.5px solid var(--primary-color);
  flex-direction: column;
`;

export const Title = styled.h4`
  display: block;
  margin: 0 1rem;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

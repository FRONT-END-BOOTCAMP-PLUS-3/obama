import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 3;
`;

export const ImageWrapper = styled.div`
  position: relative; /* 부모 요소에 position: relative 추가 */
  width: 17.5rem; /* 280px / 16 = 17.5rem */
  height: 17.5rem;
  border-radius: 50%;
  border: 2px solid var(--primary-500); /* 글로벌 CSS에서 primary-500 색상 사용 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 11.25rem; /* 180px -> 11.25rem */
  height: 11.25rem;
  object-fit: cover;
  border-radius: 50%;
  /* Applied after image upload */
  &:not([src="/icons/profilePicture.svg"]) {
    width: 100%;
    height: 100%;
  }
`;

export const ProfilePlusIcon = styled.img`
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: 3rem;
  height: 3rem;
  z-index: 10; /* 플러스 아이콘 z-index 높게 설정 */
  cursor: pointer;
`;

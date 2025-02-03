import styled from "styled-components";

export const Container = styled.div`
  margin-top: 5rem;
  padding: 2rem; /* 32px -> 2rem */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;

export const ProfileSection = styled.div`
  /*
  프로필 타이틀 섹션
  */
`;

export const ProfileTitle = styled.h3`
  display: inline-block;
  width: 11.75rem;
  height: 4.75rem;
`;

export const ButtonList = styled.div`
  padding: 0.625rem; /* 10px -> 0.625rem */
  display: flex;
  flex-wrap: wrap; /* 버튼들이 넘칠 경우 아래 줄로 이동 */
  justify-content: center;
  gap: 0.625rem; /* 10px -> 0.625rem */
  background-color: aliceblue;
`;

export const BottomButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 100%;
`;

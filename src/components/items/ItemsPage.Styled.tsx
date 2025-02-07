import styled from "styled-components";

export const ProfileCreateContainer = styled.div`
  margin-top: 5rem;
  padding: 2rem; /* 32px -> 2rem */
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export const ProfileSection = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProfileTitle = styled.h3`
  display: inline-block;
  width: 11.75rem;
  height: 4.75rem;
  margin-bottom: 6.56rem;
  text-align: center;
`;

export const ButtonList = styled.div`
  display: flex;
  flex-wrap: wrap; /* 버튼들이 넘칠 경우 아래 줄로 이동 */
  justify-content: center;
  gap: 0.625rem;
  padding: 0.625rem;
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const BottomButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const TextFieldSection = styled.div`
  margin-top: 5rem;
`;

export const MBTIButtonList = styled.div`
  width: 23.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  justify-content: center;
  padding: 0.625rem; /* 10px -> 0.625rem */
`;

export const QuestionSection = styled.div`
  display: flex;
  margin-bottom: 2.43rem;
  justify-content: center;
`;

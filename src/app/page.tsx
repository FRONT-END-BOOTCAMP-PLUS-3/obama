"use client";

import {
  TextContainer,
  SubTitleText,
  TitleRow,
  Line,
  IconContainer,
  Title,
  ButtonWrapper,
} from "./Home.styled";
import Link from "next/link";
import  Button  from "@/components/common/button/Button";
const Home = () => {
  return (
    <>
      <TextContainer>
        <SubTitleText>나를 가장 손쉽게 소개하는</SubTitleText>
        <TitleRow>
          <SubTitleText className="bold">모바일 프로필</SubTitleText>
          <Line />
        </TitleRow>
      </TextContainer>
      <IconContainer>
        <img src="/Images/logo.svg" alt="로고" />
      </IconContainer>
      <Title>소톡소톡</Title>
      <Link href="/login">
        <ButtonWrapper>
          <Button size="m" variant="contained">
            시작하기
          </Button>
        </ButtonWrapper>
      </Link>
    </>
  );
};

export default Home;

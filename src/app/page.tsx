"use client";

import { useEffect, useState } from "react";
import {
  TextContainer,
  SubTitleText,
  TitleRow,
  Line,
  IconContainer,
  Title,
  ButtonWrapper,
} from "./Home.Styled";
import Button from "@/components/common/button/Button";
import { autoLogin } from "@/utils/auth/autoLogin";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
const Home = () => {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [routerAddress, setRouterAddress] = useState<string>("/login");

  const router = useRouter();
  
  useEffect(() => {
    autoLogin();

    if (!isAuthenticated) {
      setRouterAddress("/login");
      return ;
    } else {
      setRouterAddress(isAdmin ? "/admin": "/user/profile");
    }
  }, [isAuthenticated, isAdmin]);

  const handleClickStart = () => {
    router.push(routerAddress);
  };

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
      <ButtonWrapper>
        <Button size="m" variant="contained" onClick={handleClickStart}>
          시작하기
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default Home;

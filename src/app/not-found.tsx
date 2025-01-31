"use client";

import { LogoContainer, Message, ButtonWrapper } from "./NotFound.styled";
import Button from "@/components/common/Button/Button";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <LogoContainer>
        <img src="/Images/logo.svg" alt="로고" />
      </LogoContainer>

      <Message>
        Error 404 not Found
        <br />
        페이지를 찾을 수 없습니다
      </Message>

      <Link href="/">
        <ButtonWrapper>
          <Button size="l" variant="contained">홈으로 돌아가기</Button>
        </ButtonWrapper>
      </Link>
    </>
  );
};

export default NotFound;


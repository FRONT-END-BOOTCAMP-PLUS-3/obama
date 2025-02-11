"use client";
import {
  LogoContainer,
  Message,
  PageWrapper,
} from "@/components/auth/SignUpResult.Styled";
import Link from "next/link";
import Button from "@/components/common/button/Button";

const SignUpResult = () => {
  return (
    <>
      <PageWrapper>
        <LogoContainer>
          <img src="/Images/logo.svg" alt="로고" />
        </LogoContainer>

        <Message>
          환영합니다! 회원가입이 완료되었습니다.
          <br />
          이제 소톡소톡의 모든 서비스를
          <br />
          자유롭게 이용해보세요.
        </Message>

        <Link href="/login">
          <Button size="l" variant="contained">
            로그인 페이지로 이동
          </Button>
        </Link>
      </PageWrapper>
    </>
  );
};
export default SignUpResult;

"use client";
import {
  LogoContainer,
  Message,
  PageWrapper,
} from "@/components/auth/SignUpResult.Styled";
import Link from "next/link";
import { Button } from "@/components/common/button";
import Image from "next/image";

const SignUpResult = () => {
  return (
    <>
      <PageWrapper>
        <LogoContainer>
          <Image src="/Images/logo.svg" alt="로고" width={100} height={100}/>
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

"use client";
import { maskEmail } from "@/utils/auth/maskEmail";
import {
  Caption,
  ResultSection,
  ResultSubject,
  ResultBody,
  ResultCaption,
} from "./FindeEmailResult.Styled";
import { SectionButtonLayer } from "./FindEmail.Styled";
import { Button } from "../common/button";
import { useRouter } from "next/navigation";

interface EmailProps {
    email: string; 
 
}
const FindEmailResult = ({email}:EmailProps) => {
    const maskedEmail = maskEmail(email);
    const route = useRouter();

    const handleClickLogin = () =>  {
        route.push("/login");
    }

    const handleClickSignUp = () => {
        route.push("/signup");
    }
    
  return (
    <>
    {email ? (
      <>
        <Caption>입력하신 정보와 일치하는 이메일 정보입니다.</Caption>
        <ResultSection>
          <ResultSubject>이메일 찾기 결과</ResultSubject>
          <ResultBody>{maskedEmail}</ResultBody>
          <ResultCaption>
            개인정보보호를 위해 아이디 뒷자리는 ***로 표시됩니다.
          </ResultCaption>
        </ResultSection>
        <SectionButtonLayer>
          <Button
            size="l"
            variant="line"
            type="button"
            onClick={handleClickLogin}
          >
            로그인 하러 가기
          </Button>
          
        </SectionButtonLayer>
      </>
    ) : (
      <>
        <Caption>입력하신 이메일의 정보와 일치하지 않습니다.</Caption>
        <ResultSection>
          <ResultSubject>이메일 찾기 결과</ResultSubject>
          <ResultBody>입력정보가 일치하지 않습니다.</ResultBody>
        </ResultSection>
        <SectionButtonLayer>
          <Button
            size="m"
            variant="line"
            type="button"
            onClick={handleClickSignUp}
          >
            회원가입
          </Button>
          <Button
            size="m"
            variant="contained"
            type="button"
            onClick={handleClickLogin}
          >
            로그인
          </Button>
          
        </SectionButtonLayer>
      </>
    )}
  </>
  );
};
export default FindEmailResult;

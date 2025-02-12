"use client";

import { TextField } from "@/components/common/textField";
import Button from "@/components/common/button/Button";
import { FormContainer, ErrorMessage, SuccessMessage, ButtonContainer } from "@/components/findpw/FindPw.Styled";
 

const VerifyIdentity = ({ onVerified }: { onVerified: () => void }) => {
  const handleVerification = () => {
    // 본인 인증이 완료되었을 때, 부모 컴포넌트(Page.tsx)의 step 상태 변경
    onVerified();
  };

  return (
    <>
      <FormContainer>
        <TextField name="name" size="L" placeholder="이름" />
        <TextField name="phone" size="L" placeholder="전화번호 (010-****-****)" />
        <TextField name="birthdate" size="L" placeholder="생년월일 YYYY-MM-DD" />
        <TextField name="email" size="L" placeholder="이메일" />
        <ErrorMessage>일치하지 않는 이메일 형식입니다</ErrorMessage>
        <TextField name="verification code" size="L" placeholder="인증번호" />
        <SuccessMessage>인증번호가 일치하지 않습니다</SuccessMessage>
        <ButtonContainer>
          <Button variant="line">인증번호 발송</Button>
          <Button onClick={handleVerification}>인증하기</Button>
        </ButtonContainer>
        <Button variant="line" size="l">이전</Button>
      </FormContainer>
    </>
  );
};

export default VerifyIdentity;

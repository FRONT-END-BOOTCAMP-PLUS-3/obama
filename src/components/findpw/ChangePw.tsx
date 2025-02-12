"use client";

import { TextField } from "@/components/common/textField";
import Button from "@/components/common/button/Button";
import { FormContainer, ChangePWButtonContainer , SuccessMessage} from "@/components/findpw/FindPw.Styled";

const ChangePw = () => {
  return (
    <>
      <FormContainer>
        <TextField type="password" name="newPassword" size="L" placeholder="새로운 비밀번호" />
        <TextField type="password" name="confirmPassword" size="L" placeholder="비밀번호 확인" />
        <SuccessMessage>인증번호가 일치하지 않습니다</SuccessMessage>
        <ChangePWButtonContainer>
        <Button size="l">비밀번호 변경</Button>
        <Button variant="line" size="l">이전</Button>
        </ChangePWButtonContainer>
      </FormContainer>
    </>
  );
};

export default ChangePw;

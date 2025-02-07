"use client";
import  TextField  from "@/components/common/textField/TextField";
import {
  InputLayer,
  LoginWrapper,
  SectionButtonLayer,
  TextButton,
  TextButtonLayer,
  Title,
} from "@/components/auth/LoginForm.Styled";
import Button from "@/components/common/button/Button";
import { useLoginForm } from "@/components/auth/useLoginForm";

const LoginForm = () => {
  const {
    formState,
    isLoading,
    errors,
    handleLoginFormChange,
    handleLoginSubmit,
    handleClickCancel,
    } = useLoginForm();

  const { email, password } = formState;

  return (
    <>
      <LoginWrapper>
        <Title>로그인</Title>
        <InputLayer>
          <TextField
            name="email"
            placeholder="Email"
            type="email"
            size="L"
            required={true}
            autoFocus={true}
            value={email}
            onChange={handleLoginFormChange}
          />

          <TextField
            name="password"
            placeholder="비밀번호"
            type="password"
            size="L"
            maxLength={20}
            required={true}
            value={password}
            onChange={handleLoginFormChange}
          />
        </InputLayer>
        <SectionButtonLayer>
          <Button size="m" variant="line" type="button" onClick={handleClickCancel} disabled={isLoading}>
            취 소
          </Button>
          <Button size="m" variant="contained" type="submit" onClick={handleLoginSubmit} disabled={isLoading}>
            로그인
          </Button>
          <TextButtonLayer>
            <TextButton>이메일 찾기</TextButton>
            <TextButton>비밀번호 찾기</TextButton>
          </TextButtonLayer>
        </SectionButtonLayer>
      </LoginWrapper>
    </>
  );
};

export default LoginForm;

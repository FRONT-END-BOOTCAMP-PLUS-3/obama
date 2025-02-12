"use client";
import TextField from "@/components/common/textField/TextField";
import {
  InputLayer,
  LoginWrapper,
  SectionButtonLayer,
  TextButtonLayer,
  Title,
} from "@/components/auth/login/LoginForm.Styled";
import Button from "@/components/common/button/Button";
import { useLoginForm } from "@/components/auth/useLoginForm";
import TextButton from "@/components/common/button/TextButton";
interface Category {
  id: number;
  korname: string;
  name: string;
}

const LoginForm = () => {
  const {
    formState,
    isLoading,
    handleFormChange,
    handleSubmit,
    handleClickBack,
    handleClickFindId,
    handleClickFindPassword,
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
            onChange={handleFormChange}
          />

          <TextField
            name="password"
            placeholder="비밀번호"
            type="password"
            size="L"
            maxLength={20}
            required={true}
            value={password}
            onChange={handleFormChange}
          />
        </InputLayer>
        <SectionButtonLayer>
          <Button
            size="m"
            variant="line"
            type="button"
            onClick={handleClickBack}
            disabled={isLoading}
          >
            회원 가입
          </Button>
          <Button
            size="m"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            로그인
          </Button>
          <TextButtonLayer>
            <TextButton type="button" onClick={handleClickFindId}>
              이메일 찾기
            </TextButton>
            <TextButton type="button" onClick={handleClickFindPassword}>
              비밀번호 찾기
            </TextButton>
          </TextButtonLayer>
        </SectionButtonLayer>
      </LoginWrapper>
    </>
  );
};

export default LoginForm;

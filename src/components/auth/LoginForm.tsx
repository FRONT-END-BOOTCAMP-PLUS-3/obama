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
import Button  from "@/components/common/button/Button";
import { useCallback, useState } from "react";

interface FormState {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleFormChange = useCallback((name: string, value: string) => {
    console.log(`Field ${name} changed to ${value}`);
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

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
            required={true}
            value={password}
            onChange={handleFormChange}
          />
        </InputLayer>
        <SectionButtonLayer>
          <Button size="m" variant="line" type="button">
            취 소
          </Button>
          <Button size="m" variant="contained" type="submit">
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

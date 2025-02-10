"use client";

import { useSignUpForm } from "./useSignUpForm";
import { SignUpWrapper, Title } from "@/components/auth/SignUp.Styled";
import { BirthDateSection, EmailSection, NameSection, PasswordSection, PhoneSection, SubmitSection } from "@/components/auth/signup";

const SignUpForm: React.FC = () => {
  const signUpProps = useSignUpForm();

  return (
    <SignUpWrapper onSubmit={signUpProps.handleSubmit} noValidate>
      <Title>회원가입</Title>

      <EmailSection {...signUpProps} />
      <PasswordSection {...signUpProps} />
      <BirthDateSection {...signUpProps} />
      <NameSection {...signUpProps} />
      <PhoneSection {...signUpProps} />
      <SubmitSection {...signUpProps} />
    </SignUpWrapper>
  );
};

export default SignUpForm;

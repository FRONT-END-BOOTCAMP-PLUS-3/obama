"use client";

import { useSignUpForm } from "./useSignUpForm";
import { SignUpWrapper, Title } from "@/components/auth/SignUp.Styled";
import EmailSection from "./signup/EmailSection";
import PasswordSection from "./signup/PasswordSection";
import BirthDateSection from "./signup/BirthDateSection";
import NameSection from "./signup/NameSection";
import PhoneSection from "./signup/PhoneSection";
import SubmitSection from "./signup/SubmitSection";

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

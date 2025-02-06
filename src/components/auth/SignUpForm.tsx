"use client";
import TextField from "@/components/common/TextField/TextField";

import { useSignUpForm } from "./useSignUpForm";
import { Button } from "@/components/common/Button";
import {
  SectionEmailLayer,
  SignUpWrapper,
  VerifyCodeButtonLayer,
  SectionPasswordLayer,
  SectionPhoneLayer,
  SectionButtonLayer,
} from "@/components/auth/SignUp.Styled";

const SignUpForm: React.FC = () => {
  const {
    formState,
    errors,
    phoneSegments,
    verificationCode,
    isDuplicated,
    isVerified,
    isLoading,
    isFormValid,

    handleFormChange,
    handlePhoneChange,
    handleDuplicateEmail,
    handleVerificationCodeChange,
    handleSubmitVerificationCode,
    sendEmail,
    getFieldState,
    handleSubmit,
  } = useSignUpForm();

  const {email, password, passwordConfirm, birthDate, name} = formState;
  return (
    <SignUpWrapper onSubmit={handleSubmit} noValidate>
      <h2>회원가입</h2>
      <SectionEmailLayer>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          size="M"
          state={getFieldState(email, errors.email)}
          required={true}
          autoFocus={true}
          value={email}
          onChange={handleFormChange}
          disabled={isVerified}
        />
        <Button size="s" variant="line" onClick={handleDuplicateEmail}>
          중복확인
        </Button>
        <p>{errors.email ? errors.email : "올바른 형식입니다."}</p>
      </SectionEmailLayer>

      <TextField
        name="verificationCode"
        placeholder="인증코드"
        type="number"
        size="L"
        required={true}
        value={verificationCode}
        state={getFieldState(verificationCode, errors.verificationCode)}
        onChange={handleVerificationCodeChange}
        disabled={!isDuplicated || isVerified}
      />
      <VerifyCodeButtonLayer>
        <Button
          size="m"
          variant="line"
          type="button"
          onClick={sendEmail}
          disabled={!isDuplicated || isVerified || isLoading}
        >
          인증 번호발송
        </Button>
        <Button
          size="m"
          variant="line"
          type="button"
          onClick={handleSubmitVerificationCode}
          disabled={!isDuplicated || isVerified}
        >
          인증 하기
        </Button>
      </VerifyCodeButtonLayer>

      <SectionPasswordLayer>
        <TextField
          name="password"
          placeholder="비밀번호"
          type="password"
          size="L"
          state={getFieldState(password, errors.password)}
          required={true}
          value={password}
          onChange={handleFormChange}
        />
        <TextField
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          size="L"
          state={getFieldState(password, errors.passwordConfirm)}
          required={true}
          value={passwordConfirm}
          onChange={handleFormChange}
        />
        <p>{errors.password || errors.passwordConfirm
          ?errors.password || errors.passwordConfirm : 
          "비밀번호가 일치합니다."
          }</p>
      </SectionPasswordLayer>

      <TextField
        name="birthDate"
        placeholder="생년월일"
        type="date"
        size="L"
        required={true}
        state={getFieldState(birthDate, errors.birthDate)}
        value={birthDate}
        onChange={handleFormChange}
      />
      <TextField
        name="name"
        placeholder="이름"
        type="text"
        size="L"
        state={getFieldState(birthDate, errors.birthDate)}
        required={true}
        value={name}
        onChange={handleFormChange}
      />
      <SectionPhoneLayer>
        <TextField
          name="phone-first"
          placeholder="010"
          type="text"
          size="S"
          state="default"
          required={true}
          value={phoneSegments.first}
          onChange={(name, value) => handlePhoneChange("first", value)}
          maxLength={3}
        />
        <span className="hyphen" />
        <TextField
          name="phone-second"
          placeholder="1234"
          type="text"
          size="S"
          required={true}
          value={phoneSegments.second}
          onChange={(name, value) => handlePhoneChange("second", value)}
          maxLength={4}
        />
        <span className="hyphen" />
        <TextField
          name="phone-third"
          placeholder="5678"
          type="text"
          size="S"
          required={true}
          value={phoneSegments.third}
          onChange={(name, value) => handlePhoneChange("third", value)}
          maxLength={4}
        />
      </SectionPhoneLayer>

      <SectionButtonLayer>
        <Button size="l" variant="line" type="submit" disabled={!isFormValid}>
          회원 가입하기
        </Button>
        <Button size="l" variant="contained">
          취 소
        </Button>
      </SectionButtonLayer>
    </SignUpWrapper>
  );
};

export default SignUpForm;

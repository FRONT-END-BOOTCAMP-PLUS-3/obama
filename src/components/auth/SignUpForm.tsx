"use client";
import TextField from "@/components/common/TextField/TextField";

import { useSignUpForm } from "./useSignUpForm";
import { Button } from "@/components/common/Button";
import { SectionEmailProps, SignUpWrapper } from "./SignUp.Styled";

const SignUpForm: React.FC = () => {
  const {
    formState,
    errors,
    verificationCode,
    isDuplicated,
    isVerified,
    isLoading,
    isFormValid,

    handleChange,
    handleDuplicateEmail,
    handleVerificationCodeChange,
    handleSubmitVerificationCode,
    sendEmail,
    handleSubmit,
  } = useSignUpForm();

  return (
    <SignUpWrapper onSubmit={handleSubmit} noValidate>
      <h2>회원가입</h2>
      <SectionEmailProps>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          size="M"
          state="default"
          autoFocus={true}
        />
        <Button size="s" variant="line">
          중복확인
        </Button>
      </SectionEmailProps>
      <TextField
        name="verificationCode"
        placeholder="인증코드"
        type="number"
        size="L"
        state="default"
      />

      <TextField
        name="password"
        placeholder="비밀번호"
        type="password"
        size="L"
        state="default"
      />
      <TextField
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        type="password"
        size="L"
        state="default"
      />
      <TextField
        name="birhDate"
        placeholder="생년월일"
        type="text"
        size="L"
        state="default"
      />
      <TextField
        name="name"
        placeholder="이름"
        type="text"
        size="L"
        state="default"
      />

      <TextField
        name="phone-first"
        placeholder="010"
        type="number"
        size="S"
        state="default"
      />

      <TextField
        name="phone-second"
        placeholder="1234"
        type="number"
        size="S"
      />

      <TextField name="phone-third" placeholder="5678" type="number" size="S" />

      {/* 이메일 입력 */}
      <div>
        <label htmlFor="email">이메일</label>

        <input
          type="email"
          id="email"
          placeholder="이메일을 입력하세요"
          value={formState.email}
          onChange={handleChange("email")}
          required
          disabled={isLoading || isVerified}
        />
        <button
          type="button"
          disabled={isLoading}
          onClick={handleDuplicateEmail}
        >
          중복확인
        </button>
        {errors.email && <p>{errors.email}</p>}
        {isDuplicated && <p>인증되었습니다.</p>}
      </div>
      {/* 인증코드 */}
      <div>
        <label htmlFor="verificationCode">인증코드</label>
        <input
          type="text"
          id="verificationCode"
          placeholder="인증코드를 입력하세요"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          required
          disabled={isLoading || isVerified}
        />
        <button type="button" disabled={isLoading} onClick={sendEmail}>
          인증번호 발송
        </button>
        <button
          type="button"
          disabled={isLoading || isVerified || verificationCode.length !== 6}
          onClick={handleSubmitVerificationCode}
        >
          인증하기
        </button>
        {errors.verificationCode && <p>{errors.verificationCode}</p>}
      </div>
      {/* 비밀번호 입력 */}
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
          value={formState.password}
          onChange={handleChange("password")}
          required
          disabled={isLoading}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      {/* 비밀번호 확인 */}
      <div>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          placeholder="비밀번호를 다시 입력하세요"
          value={formState.passwordConfirm}
          onChange={handleChange("passwordConfirm")}
          required
          disabled={isLoading}
        />
      </div>
      {/* 이름 입력 */}
      <div>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          placeholder="이름을 입력하세요"
          value={formState.name}
          onChange={handleChange("name")}
          required
          disabled={isLoading}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="birthDate">생일</label>
        <input
          type="text"
          id="birthDate"
          placeholder="생일을 입력하세요"
          value={formState.birthDate}
          onChange={handleChange("birthDate")}
          required
          disabled={isLoading}
        />
        {errors.birthDate && <p>{errors.birthDate}</p>}
      </div>
      {/* 전화번호 입력 */}
      <div>
        <label htmlFor="phone">전화번호</label>
        <input
          type="text"
          id="phone"
          placeholder="전화번호를 입력하세요"
          value={formState.phone}
          onChange={handleChange("phone")}
          required
          disabled={isLoading}
        />
        {errors.phone && <p>{errors.phone}</p>}
      </div>
      {/* 버튼 그룹 */}
      <div>
        <button
          type="submit"
          disabled={isLoading || !isFormValid || !isVerified}
        >
          {isLoading ? "회원가입 중..." : "회원가입"}
        </button>
        <button type="button" onClick={() => alert("이전으로가기")}>
          이전으로 가기
        </button>
      </div>
    </SignUpWrapper>
  );
};
export default SignUpForm;

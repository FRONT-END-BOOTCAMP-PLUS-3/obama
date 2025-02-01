"use client";

import { useSignUpForm } from "./useSignForm";

const SignUpForm: React.FC = () => {


  const {
    formState,
    errors,
    verificationCode,
    isVerified,
    isLoading,
    isFormValid,
    handleChange,
    handleVerificationCodeChange,
    handleSubmitVerificationCode,
    sendEmail,
    handleSubmit,
  } = useSignUpForm();
  

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>회원가입</h1>

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
        <button type="button" disabled={isLoading}>
          중복확인
        </button>
        {errors.email && <p>{errors.email}</p>}
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
        <button type="button" disabled={isLoading || isVerified} onClick={sendEmail}>
          인증번호 발송
        </button>
        <button
          type="button"
          disabled={isLoading ||  isVerified || verificationCode.length !== 6}
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
        <button type="submit" disabled={isLoading || !isFormValid || !isVerified}>
          {isLoading ? "회원가입 중..." : "회원가입"}
        </button>
        <button type="button" onClick={() => alert("이전으로가기")}> 
          이전으로 가기
        </button>
      </div>
    </form>
  );
};
export default SignUpForm;

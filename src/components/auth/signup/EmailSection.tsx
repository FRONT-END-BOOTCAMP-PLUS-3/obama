import {
  SectionEmailCheckLayer,
  SectionEmailLayer,
  VerifyCodeButtonLayer,
  VerifyCodeLayer,
} from "@/components/auth/SignUp.Styled";
import TextField from "@/components/common/textField/TextField";
import Button from "@/components/common/button/Button";
import { SignUpProps } from "@/types/auth";

const EmailSection: React.FC<
  Pick<
    SignUpProps,
    | "formState"
    | "errors"
    | "verificationCode"
    | "isDuplicated"
    | "isVerified"
    | "isLoading"
    | "handleFormChange"
    | "handleDuplicateEmail"
    | "handleVerificationCodeChange"
    | "sendEmail"
    | "handleSubmitVerificationCode"
    | "getFieldState"
  >
> = ({
  formState,
  errors,
  verificationCode,
  isDuplicated,
  isVerified,
  isLoading,
  handleFormChange,
  handleDuplicateEmail,
  handleVerificationCodeChange,
  sendEmail,
  handleSubmitVerificationCode,
  getFieldState,
}) => {
  const { email } = formState;
  return (
    <>
      <SectionEmailLayer>
        <SectionEmailCheckLayer>
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
          <Button
            size="s"
            variant="line"
            type="button"
            onClick={handleDuplicateEmail}
            disabled={isVerified}
          >
            중복확인
          </Button>
          <p>{errors.email ? errors.email : "올바른 형식입니다."}</p>
        </SectionEmailCheckLayer>

        <VerifyCodeLayer>
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
        </VerifyCodeLayer>
      </SectionEmailLayer>
    </>
  );
};

export default EmailSection;

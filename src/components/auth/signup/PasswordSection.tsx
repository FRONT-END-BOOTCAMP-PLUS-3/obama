import TextField from "@/components/common/textField/TextField";
import { SectionPasswordLayer } from "@/components/auth/SignUp.Styled";
import { SignUpProps } from "@/types/auth";
import Image from "next/image";

interface PasswordSectionProps
  extends Pick<
    SignUpProps,
    "formState" | "errors" | "handleFormChange" | "getFieldState"
  > {
  onClose?: () => void; // 선택적 prop
}

const PasswordSection: React.FC<PasswordSectionProps> = ({
  formState,
  errors,
  handleFormChange,
  getFieldState,
  onClose,
}) => {
  const { password, passwordConfirm } = formState;

  return (
    <>
      {onClose && <Image src="/icons/editClose.svg" alt="closeIcon" width={24} height={24} />  }
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
        <p>
          {errors.password || errors.passwordConfirm
            ? errors.password || errors.passwordConfirm
            : "비밀번호가 일치합니다."}
        </p>
      </SectionPasswordLayer>
    </>
  );
};

export default PasswordSection;

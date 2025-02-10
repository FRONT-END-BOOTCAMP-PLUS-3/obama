import TextField from "@/components/common/textField/TextField";
import { SectionPasswordLayer } from "@/components/auth/SignUp.Styled";
import { SignUpProps } from "@/types/auth";

const PasswordSection: React.FC<
  Pick<
    SignUpProps,
    "formState" | "errors" | "handleFormChange" | "getFieldState"
  >
> = ({ formState, errors, handleFormChange, getFieldState }) => {
  const { password, passwordConfirm } = formState;

  return (
    <>
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

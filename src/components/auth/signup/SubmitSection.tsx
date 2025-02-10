import { Button } from "@/components/common/Button";
import { SectionButtonLayer } from "@/components/auth/SignUp.Styled";
import { SignUpProps } from "@/types/auth";

const SubmitSection: React.FC<
  Pick<SignUpProps, "isFormValid" | "handleSubmit">
> = ({ isFormValid, handleSubmit }) => {
  return (
    <SectionButtonLayer>
      <Button
        size="l"
        variant="line"
        type="submit"
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        회원 가입하기
      </Button>
      <Button size="l" variant="contained" type="button">
        취 소
      </Button>
    </SectionButtonLayer>
  );
};

export default SubmitSection;

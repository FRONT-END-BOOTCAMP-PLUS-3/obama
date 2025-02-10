import TextField from "@/components/common/textField/TextField";
import { SignUpProps } from "@/types/auth";

const BirthDateSection: React.FC<Pick<SignUpProps,"formState" | "errors" | "handleFormChange" | "getFieldState">> = ({
  formState,
  errors,
  handleFormChange,
  getFieldState,
}) => {
  const { birthDate } = formState;

  return (
    <TextField
      name="birthDate"
      placeholder="생년월일"
      type="date"
      size="L"
      required
      state={getFieldState(birthDate, errors.birthDate)}
      value={birthDate}
      onChange={handleFormChange}
    />
  );
};

export default BirthDateSection;

import TextField from "@/components/common/textField/TextField";
import { SignUpProps } from "@/types/auth";
import Image from "next/image";

interface BirthDateSectionProps
  extends Pick<
    SignUpProps,
    "formState" | "errors" | "handleFormChange" | "getFieldState"
  >{}

const BirthDateSection: React.FC<BirthDateSectionProps> = ({
  formState,
  errors,
  handleFormChange,
  getFieldState,
}) => {
  const { birthDate } = formState;

  return (
    <>
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
    </>
  );
};

export default BirthDateSection;

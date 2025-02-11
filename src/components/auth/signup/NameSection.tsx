import { TextField } from "@/components/common/textField";
import { SignUpProps } from "@/types/auth";

const NameSection: React.FC<
  Pick<
    SignUpProps,
    "formState" | "errors" | "handleFormChange" | "getFieldState"
  >
= ({ formState, errors, handleFormChange, getFieldState }) => {
  const { name } = formState;

  return (
    <>
      <TextField
        name="name"
        placeholder="이름"
        type="text"
        size="L"
        required
        state={getFieldState(name, errors.name)}
        value={name}
        onChange={handleFormChange}
      />
    </>
  );
};

export default NameSection;
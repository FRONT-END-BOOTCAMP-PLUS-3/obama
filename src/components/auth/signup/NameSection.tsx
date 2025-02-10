import { TextField } from "@/components/common/textField";
import { SignUpProps } from "@/types/auth";
import Image from "next/image";

interface NameSectionProps
  extends Pick<
    SignUpProps,
    "formState" | "errors" | "handleFormChange" | "getFieldState"
  > {
  onClose?: () => void; // 선택적 prop
}

const NameSection: React.FC<NameSectionProps> = ({
  formState,
  errors,
  handleFormChange,
  getFieldState,
  onClose,
}) => {
  const { name } = formState;

  return (
    <>
      {onClose && <Image src="/icons/editClose.svg" alt="closeIcon" width={24} height={24} />  }
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

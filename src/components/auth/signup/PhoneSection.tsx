import TextField from "@/components/common/textField/TextField";
import { SectionPhoneLayer } from "@/components/auth/SignUp.Styled";
import { SignUpProps } from "@/types/auth";

const PhoneSection: React.FC<
  Pick<SignUpProps, "phoneSegments" | "handlePhoneChange">
> = ({ phoneSegments, handlePhoneChange }) => {
  return (
    <>
      <SectionPhoneLayer>
        <TextField
          name="phone-first"
          placeholder="010"
          type="text"
          size="S"
          state="default"
          required={true}
          value={phoneSegments.first}
          onChange={(name, value) => handlePhoneChange("first", value)}
          maxLength={3}
        />
        <span className="hyphen" />
        <TextField
          name="phone-second"
          placeholder="1234"
          type="text"
          size="S"
          required={true}
          value={phoneSegments.second}
          onChange={(name, value) => handlePhoneChange("second", value)}
          maxLength={4}
        />
        <span className="hyphen" />
        <TextField
          name="phone-third"
          placeholder="5678"
          type="text"
          size="S"
          required={true}
          value={phoneSegments.third}
          onChange={(name, value) => handlePhoneChange("third", value)}
          maxLength={4}
        />
      </SectionPhoneLayer>
    </>
  );
};

export default PhoneSection;

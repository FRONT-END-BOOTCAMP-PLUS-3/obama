import Image from "next/image";
import {
  IconLayer,
  InfoItemWrapper,
  InfoLayer,
  InfoText,
  InfoTitle,
  SelectedSectionLayer,
  SubjectLayer,
} from "@/components/dashboard/InfoItem.Styled";
import {
  NameSection,
  EmailSection,
  BirthDateSection,
  PhoneSection,
  PasswordSection,
} from "@/components/auth/signup";
import { useSignUpForm } from "@/components/auth/useSignUpForm";
import { useState } from "react";

interface UserData {
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  password: string;
}

interface InfoItemProps {
  field: keyof UserData; // ✅ key 값을 받도록 변경
  text?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ field, text = "" }) => {
  const isEditable = field !== "name";

  const signUpProps = useSignUpForm();

  const sectionsMap: Record<
    keyof UserData,
    React.FC<ReturnType<typeof useSignUpForm>>
  > = {
    name: NameSection,
    email: EmailSection,
    birthDate: BirthDateSection,
    phone: PhoneSection,
    password: PasswordSection,
  };
  const [selectedField, setSelectedField] = useState<keyof UserData | null>(
    null
  );
  const SelectedSection = selectedField ? sectionsMap[selectedField] : null;

  const keyToTitleMap: Record<keyof UserData, string> = {
    name: "이름",
    email: "이메일",
    birthDate: "생년월일",
    phone: "휴대폰 번호",
    password: "비밀번호",
  };

  const handleClickIcon = () => {
    setSelectedField(field);
  };

  // const handleClose = () => {
  //   setSelectedField(null);
  // };

  // const handleSave = () => {
  //   // api update 호출
  //   setSelectedField(null);
  // };

  return (
    <InfoItemWrapper>
      <InfoLayer>
        <SubjectLayer>
          <InfoTitle>{keyToTitleMap[field]}</InfoTitle>

          <InfoText>{text}</InfoText>
        </SubjectLayer>
      
      {isEditable && !selectedField && !selectedField && (
        <IconLayer onClick={handleClickIcon}>
          <Image
            src="/icons/editPen.svg"
            alt="편집 아이콘"
            width={28}
            height={28}
            priority
          />
        </IconLayer>
      )}

      {selectedField && SelectedSection && (
        <>
          <IconLayer>
            <Image
              src="/icons/editPen.svg"
              alt="편집 아이콘"
              width={28}
              height={28}
              priority
            />
            <Image
              src="/icons/editPen.svg"
              alt="편집 아이콘"
              width={28}
              height={28}
              priority
            />
          </IconLayer>

          <SelectedSectionLayer>
            <SelectedSection {...signUpProps} />
          </SelectedSectionLayer>
        </>
      )}
      </InfoLayer>
    </InfoItemWrapper>
  );
};
export default InfoItem;

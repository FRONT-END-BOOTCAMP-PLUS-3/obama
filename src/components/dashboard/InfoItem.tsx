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
import { useEffect, useState } from "react";
import { maskAll } from "@/utils/auth/password";

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
  
  const [selectedField, setSelectedField] = useState<keyof UserData | null>(null);
  const [isFieldValid, setIsFiledValid] = useState<boolean>(false);  
  const [displayValue, setDisplayValue] = useState<string>(text);

  const signUpProps = useSignUpForm();
  const {errors, isVerified, formState, resetField}= signUpProps;


  //초기 디스플레이 값 설정
  useEffect(()=> {
    setDisplayValue(text);
  },[text]);

  // check 버튼 유효성 검사
  useEffect(()=> {
    let isValid = !errors[field];

    if (field === "email") {
      isValid = isValid && isVerified;
    }

    if (field === "password") {
      
      isValid = isValid && formState.password === formState.passwordConfirm;
    }

    setIsFiledValid(isValid)

  },[errors, formState, field, isVerified])
  

  const isEditable = field !== "name";

  // column별 각 section 매핑
  const sectionsMap: Record<keyof UserData,React.FC<ReturnType<typeof useSignUpForm>>> = {
      name: NameSection,
      email: EmailSection,
      birthDate: BirthDateSection,
      phone: PhoneSection,
      password: PasswordSection,
  };

  // 만약 `selectedField`가 있다면, 매핑된 섹션 컴포넌트를 가져옴
  const SelectedSection = selectedField ? sectionsMap[selectedField] : null;

  const keyToTitleMap: Record<keyof UserData, string> = {
    name: "이름",
    email: "이메일",
    birthDate: "생년월일",
    phone: "휴대폰 번호",
    password: "비밀번호",
  };
  
  // 편집모드 진입
  const handleClickEdit = () => {
    setSelectedField(field);
  };

  // 취소 아이콘 클릭
  const handleClickClose = () => {
    setSelectedField(null);
  };

  // 저장 아이콘 클릭
  const handleClickSave =  () => {
    // 만약 유효성 통과가 아니라면 클릭 불가

    const updatedValue = signUpProps.formState[field];

    if(!isFieldValid) {
      return;
    }

    setDisplayValue(updatedValue);

    console.log(`Updating ${field}:`, updatedValue);
    // 여기서 API 호출 or 추가 로직
    // const response = await fetchClient()
    
    resetField(field);

    // 창 닫기
    setSelectedField(null);
  };

  return (
    <InfoItemWrapper>
      <InfoLayer>
        <SubjectLayer>
          <InfoTitle>{keyToTitleMap[field]}</InfoTitle>

            <InfoText>{field === "password" ? maskAll(displayValue): displayValue}</InfoText>
        </SubjectLayer>

      {/* name속성 편집 불가 */}
      {isEditable && !selectedField && (
        <IconLayer>
          <Image
            src="/icons/editPen.svg"
            alt="편집 아이콘"
            width={28}
            height={28}
            priority
            onClick={handleClickEdit}
          />
        </IconLayer>
      )}
      {/* 편집 모드 시 조건부 렌더링 */}
      {selectedField && SelectedSection && (
        <>
          <IconLayer>
            <Image
              src="/icons/editCheck.svg"
              alt="저장 아이콘"
              width={48}
              height={48}
              priority
              onClick= {handleClickSave}
              style={{
                opacity: isFieldValid ? 1 : 0.4,
                cursor: isFieldValid ? "pointer" : "not-allowed",
              }}
            />
            <Image
              src="/icons/editClose.svg"
              alt="취소 아이콘"
              width={28}
              height={28}
              priority
              onClick={handleClickClose}
            />
          </IconLayer>
          {/* 편집 모드 section */}
          <SelectedSectionLayer>
            <SelectedSection 
            {...signUpProps} />
          </SelectedSectionLayer>
        </>
      )}
      </InfoLayer>
    </InfoItemWrapper>
  );
};
export default InfoItem;

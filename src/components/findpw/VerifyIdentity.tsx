"use client";

import { TextField } from "@/components/common/textField";
import Button from "@/components/common/button/Button";
import {
  FormContainer,
  ButtonContainer,
} from "@/components/findpw/FindPw.Styled";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchClient } from "@/utils/api/fetchClient";

interface FormState {
  name: string;
  phone: string;
  birthDate: string;
  email: string;
}
interface VerifyIdentityProps {
  onVerified: (id: string, isValid: boolean) => void; // ✅ 부모와 동일한 타입 유지
};

const VerifyIdentity = ({ onVerified }: VerifyIdentityProps) => {
  const route = useRouter();

  const [formState, setFormState] = useState<FormState>({
    name: "",
    phone: "",
    birthDate: "",
    email: "",
  });

  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (fieldName: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleCancel = () => {
    route.push("login");
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetchClient<FormState, {userId:string}>(
        "/api/findpw",
        {
          method: "POST",
          body: formState,
        }
      );

      if (response.status === 200 && response.data) {
        // 로그인 성공 디버깅

        const fetchedUserId = response.data.userId;

        setIsValid(true);
        
        onVerified(fetchedUserId, isValid);
      }else {
        console.error("아이디가 존재하지 않습니다.", response.error);
      }
      
    } catch (error) {
      console.error(error);
      alert("입력한 정보가 일치하지 않습니다.");
    }
   
  };

  return (
    <>
      <FormContainer noValidate>
        <TextField
          name="name"
          size="L"
          placeholder="이름"
          value={formState.name}
          required
          onChange={handleChange}
        />
        <TextField
          name="phone"
          size="L"
          placeholder="전화번호 (010********)"
          value={formState.phone}
          maxLength={11}
          required
          onChange={handleChange}
        />
        <TextField
          name="birthDate"
          size="L"
          placeholder="생년월일 YYYY-MM-DD"
          type="date"
          value={formState.birthDate}
          required
          onChange={handleChange}
        />
        <TextField
          name="email"
          size="L"
          placeholder="이메일"
          required
          value={formState.email}
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button
            variant="contained"
            size="l"
            type="submit"
            onClick={handleVerification}
          >
            비밀번호 변경
          </Button>
        </ButtonContainer>
        <Button variant="line" size="l" type="button" onClick={handleCancel}>
          이전
        </Button>
      </FormContainer>
    </>
  );
};

export default VerifyIdentity;

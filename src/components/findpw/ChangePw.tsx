"use client";

import { TextField } from "@/components/common/textField";
import Button from "@/components/common/button/Button";
import {
  FormContainer,
  ChangePWButtonContainer,
  SuccessMessage,
} from "@/components/findpw/FindPw.Styled";
import { useState } from "react";
import { validatePassword } from "@/utils/auth/validate";
import { fetchClient } from "@/utils/api/fetchClient";
import { useRouter } from "next/navigation";

interface ChangePwProps {
  userId: string | null; // ✅ 부모 컴포넌트에서 전달받은 userId
}

const ChangePw = ({ userId }: ChangePwProps) => {
  console.log("3"+userId);

  const route = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleChange = (
    field: "password" | "confirmPassword",
    value: string
  ) => {
    if (field === "password") {
      // password 값 업데이트
      setPassword(value);
      // 새 비밀번호에 대한 유효성 검사
      const validationError = validatePassword(value);
      // confirmPassword가 이미 입력되어 있다면 두 값이 일치하는지 확인
      if (confirmPassword && value !== confirmPassword) {
        setErrorMessage("비밀번호가 일치하지 않습니다.");
      } else {
        setErrorMessage(validationError);
      }
    } else if (field === "confirmPassword") {
      // confirmPassword 값 업데이트
      setConfirmPassword(value);
      // 입력된 confirmPassword와 기존 password가 일치하는지 확인
      if (password !== value) {
        setErrorMessage("비밀번호가 일치하지 않습니다.");
      } else {
        // 일치하면, password의 유효성 검사 결과를 반영
        const validationError = validatePassword(password);
        setErrorMessage(validationError);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 유효성 검사: 새 비밀번호의 조건 확인
    const error = validatePassword(password);
    if (error) {
      setErrorMessage(error);
      return;
    }
    // 두 비밀번호가 일치하는지 확인
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 유효한 사용자 ID가 있는지 확인
    if (!userId) {
      alert("유효한 사용자 정보가 없습니다.");
      return;
    }

    try {
      const response = await fetchClient<{ userId: string; password: string }, { success: boolean }>("/api/findpw", {
        method: "PATCH",
        body: { userId, password },
      });

      if (response.status === 200 && response.data?.success) {
        alert("비밀번호가 변경되었습니다.");
        route.push("/login");
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    route.push("/login");
  };

  return (
    <>
      <FormContainer noValidate>
        <TextField
          type="password"
          name="password"
          size="L"
          placeholder="새로운 비밀번호"
          value={password}
          maxLength={20}
          required
          onChange={(_, value) => handleChange("password", value)}
        />
        <TextField
          type="password"
          name="confirmPassword"
          size="L"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          maxLength={20}
          onChange={(_, value) => handleChange("confirmPassword", value)}
          required
        />
        {errorMessage && <SuccessMessage>{errorMessage}</SuccessMessage>}
        <ChangePWButtonContainer>
          <Button size="l" type="submit" onClick={handleSubmit}>
            비밀번호 변경
          </Button>
          <Button variant="line" size="l" type="button" onClick={handleCancel}>
            이전
          </Button>
        </ChangePWButtonContainer>
      </FormContainer>
    </>
  );
};

export default ChangePw;

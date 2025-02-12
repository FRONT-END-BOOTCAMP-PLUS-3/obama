import { fetchClient } from "@/utils/api/fetchClient";
import { validateName, validatePhone } from "@/utils/auth/validate";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface FindIDFormState {
  name: string;
  phone: string;
}

interface FindIDFormError {
  name?: string;
  phone?: string;
}

export const useFindIDForm = () => {
  const router = useRouter();

  const [formState, setFormState] = useState<FindIDFormState>({
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FindIDFormError>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = useCallback(() => {
    const newErrors: FindIDFormError = {};

    const nameError = validateName(formState.name);
    if (nameError) newErrors.name = nameError;

    const phoneError = validatePhone(formState.phone);
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);

    // 오류가 하나도 없으면 폼이 유효한 상태입니다.
    return Object.keys(newErrors).length === 0;
  }, [formState]);

  const handleFormChange = useCallback((field: string, value: string) => {
    // ✅ 필터링된 값으로 상태 업데이트
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // submit 버튼을 눌렀을 때 눌렀을 시 동작 함수
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      // 이벤트 시 재랜더링 방지 함수
      e.preventDefault();

      // 유효성 검사
      if (!validateForm()) return;

      setIsLoading(true);

      try {
        // ✅ fetchClient를 사용하여 로그인 요청
        const response = await fetchClient<FindIDFormState, { email: string }>(
          "/api/findid",
          {
            method: "POST",
            body: formState,
            requiresAuth: false, // 로그인은 인증 헤더 필요 없음
          }
        );

        if (response.status === 200 && response.data) {
          // 로그인 성공 디버깅
          console.log("✅ 로그인 성공:", response.data);

          // 로그인 시 UUID와 UserRole data 출력
        //   const { email } = response.data;

          // 전역 상태 로그인 관리
          // 로그인 성공시 profile routing
          router.push("/");
        } else {
          console.error("❌ 로그인 실패:", response.error);
        }
      } catch (error) {
        console.error("❌ API 요청 오류:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [formState, router, validateForm]
  );

  const handleClickBack = useCallback(async () => {
    router.push("/login");
  }, []);

  return {
    formState,
    errors,
    isLoading,

    handleFormChange,
    handleSubmit,
    handleClickBack,
  };
};

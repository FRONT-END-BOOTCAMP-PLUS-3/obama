import { LoginRequestDto } from "@/application/usecases/auth/dtos/LoginRequestDto";
import { LoginResponseDto } from "@/application/usecases/auth/dtos/LoginResponseDto";
import useAuthStore from "@/store/authStore";
import { fetchClient } from "@/utils/api/fetchClient";
import { validateEmail, validatePassword } from "@/utils/auth/validate";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface LoginFormState {
  email: string;
  password: string;
}

interface LoginFormError {
  email?:string;
  password?: string;
}

export const useLoginForm = () => {
  
  const {setAuth} = useAuthStore.getState();
  const router = useRouter();

  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormError>({})
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = useCallback(() => {
    const newErrors: LoginFormError = {};

    const emailError = validateEmail(formState.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formState.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);

    // 오류가 하나도 없으면 폼이 유효한 상태입니다.
    return Object.keys(newErrors).length === 0;
  }, [formState]);

  const handleFormChange = useCallback((name: string, value: string) => {
    // 입력 변경 반영 함수
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // 로그인 버튼 눌렀을 시 동작 함수
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    
    // 이벤트 시 재랜더링 방지 함수
    e.preventDefault();
    
    // 유효성 검사
    if (!validateForm()) return;
  
    setIsLoading(true);
    
    try {

      // ✅ fetchClient를 사용하여 로그인 요청
      const response = await fetchClient<LoginRequestDto, LoginResponseDto>("/api/login", {
        method: "POST",
        body: formState,
        requiresAuth: false, // 로그인은 인증 헤더 필요 없음
      });
  
      if (response.status === 200 && response.data) {
        // 로그인 성공 디버깅
        console.log("✅ 로그인 성공:", response.data.userId);

        // 로그인 시 UUID와 UserRole data 출력
        const { userId, role } = response.data;
        
        // 전역 상태 로그인 관리
        setAuth(userId, role);
        // 로그인 성공시 profile routing
        router.push("/user/profile");  
      
      } else {
        console.error("❌ 로그인 실패:", response.error);
      }
      
    } catch (error) {
      console.error("❌ API 요청 오류:", error);
    } finally {
      setIsLoading(false);
    }
  }, [formState, router, validateForm]);
  
  const handleClickBack = useCallback(async () => {
    router.push("/signup");
  }, [])

  const handleClickFindId = useCallback(async () => {
    router.push("/findemail");
  },[]);

  const handleClickFindPassword = useCallback(async () => {
    router.push("/findpw");
  }, []);

  return {
    formState,
    errors,
    isLoading,

    handleFormChange,
    handleSubmit,
    handleClickBack,
    handleClickFindId,
    handleClickFindPassword
    
  };
};

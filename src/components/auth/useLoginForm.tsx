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

  const handleLoginFormChange = useCallback((name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // const handleLoginSubmit = useCallback(async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   setIsLoading(true);
    
  //   try {
  //     const response = await apiClient.post("/api/login", 
  //       formState,
  //     );

  //     if(response.status === 200){
  //       console.log(response.data.userId)
  //       router.push("/");  
  //     }     
      
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [formState, router, validateForm]);

  const handleLoginSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    setIsLoading(true);
    
    try {
      // ✅ fetchClient를 사용하여 로그인 요청
      const response = await fetchClient<LoginFormState, { userId: string }>("/api/login", {
        method: "POST",
        body: formState,
        requiresAuth: false, // 로그인은 인증 헤더 필요 없음
      });
  
      if (response.status === 200 && response.data) {
        console.log("✅ 로그인 성공:", response.data.userId);
        localStorage.setItem("userId", response.data.userId); // UUID 저장
        router.push("/");  
      } else {
        console.error("❌ 로그인 실패:", response.error);
      }
      
    } catch (error) {
      console.error("❌ API 요청 오류:", error);
    } finally {
      setIsLoading(false);
    }
  }, [formState, router, validateForm]);
  

  const handleClickCancel = useCallback(async () => {
    router.push("/");
  }, [])

  return {
    formState,
    errors,
    isLoading,
    handleLoginFormChange,
    handleLoginSubmit,
    handleClickCancel,
  };
};

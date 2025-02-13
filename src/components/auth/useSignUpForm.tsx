import apiClient from "@/utils/api/apiClient";
import {
  validateBirthDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateVerificationCode,
} from "@/utils/auth/validate";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface FormState {
  email: string;
  password: string;
  passwordConfirm: string;
  birthDate: string;
  name: string;
  phone: string;
}

interface PhoneSegments {
  first: string;
  second: string;
  third: string;
}
interface FormErrors {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  birthDate?: string;
  name?: string;
  phone?: string;
  verificationCode?: string;
}

type SignUpRequest = Omit<FormState, "passwordConfirm">;

export const useSignUpForm = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    passwordConfirm: "",
    birthDate: "",
    name: "",
    phone: "",
  });

  const [phoneSegments, setPhoneSegments] = useState<PhoneSegments>({
    first: "",
    second: "",
    third: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isDuplicated, setIsDuplicated] = useState<boolean>(false);

  const router = useRouter();

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};

    const emailError = validateEmail(formState.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formState.password);
    if (passwordError) newErrors.password = passwordError;

    if (formState.password !== formState.passwordConfirm)
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";

    const nameError = validateName(formState.name);
    if (nameError) newErrors.name = nameError;

    const phoneError = validatePhone(formState.phone);
    if (phoneError) newErrors.phone = phoneError;

    const verificationCodeError = validateVerificationCode(verificationCode);
    if (verificationCodeError)
      newErrors.verificationCode = verificationCodeError;

    const birthDateError = validateBirthDate(formState.birthDate);
    if (birthDateError) newErrors.birthDate = birthDateError;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }, [formState, verificationCode]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formState, verificationCode, validateForm]);

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      phone: phoneSegments.first + phoneSegments.second + phoneSegments.third,
    }));
  }, [phoneSegments]);

  const handleFormChange = useCallback((name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handlePhoneChange = useCallback(
    (segment: "first" | "second" | "third", value: string) => {
      setPhoneSegments((prev) => ({
        ...prev,
        [segment]: value,
      }));
    },
    []
  );

  const getFieldState = (
    value: string,
    errorMessage?: string
  ): "default" | "error" => {
    if (value.trim() === "") {
      return "default";
    }
    return errorMessage ? "error" : "default";
  };

  const handleDuplicateEmail = useCallback(async () => {
    try {
      const response = await apiClient.post("/api/auth/check-email", {
        email: formState.email,
      });
      const { isDuplicate, message } = response.data;

      setIsLoading(true);

      if (!isDuplicate) {
        alert(message);
        setIsDuplicated(true);
      } else {
        alert(message);
        setIsDuplicated(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [formState.email]);

  const handleVerificationCodeChange = useCallback(
    (name: string, value: string) => {
      setVerificationCode(value.replace(/\s+/g, ""));
    },
    []
  );

  const sendEmail = useCallback(async () => {

    try {
     await apiClient.post("/api/auth/send-email", {
        email: formState.email,
      });
      

    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("알수 없는 서버오류");
      }
    }
  }, [formState.email]);

  const handleSubmitVerificationCode = useCallback(async () => {
    try {
      const response = await apiClient.post("/api/auth/verify-code", {
        email: formState.email,
        verificationCode: verificationCode,
      });

      const data = await response.data;

      setIsVerified(data.isVerified);

      if (data.isVerified) {
        alert(data.message);
      } else {
        alert(data.error || "인증 코드가 잘못되었습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  }, [verificationCode]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const signUpRequest: SignUpRequest = {
        email: formState.email,
        password: formState.password,
        birthDate: formState.birthDate,
        name: formState.name,
        phone: formState.phone,
      };

      if (!isFormValid) {
        alert("모든 입력 필드를 올바르게 작성해주세요.");
        return;
      }

      if (!isVerified) {
        alert("인증이 완료되지 않았습니다.");
        return;
      }

      setIsLoading(true);

      try {
        const response = await apiClient.post("api/signup", {
          signUpRequest,
        });
        alert(response.data.message || "회원가입 성공");
        router.push("/signup/result");
      } catch (error: unknown) {
        console.error(error);

        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("알 수 없는 서버 오류 발생");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [formState, isFormValid, isVerified]
  );

  const handleCancel = useCallback(async (): Promise<void> => {
    await router.push("/login"); // router.push()는 Promise를 반환하므로 그대로 사용 가능
  }, []);

  const resetField = (field: keyof FormState) => {
    setFormState((prev) => ({
      ...prev,
      [field]: "",
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined, // 에러 초기화
    }));

    if (field === "email") {
      setIsDuplicated(false);
      setIsVerified(false);
      setVerificationCode("");
    }
    if (field === "password") {
      setFormState((prev) => ({
        ...prev,
        ["passwordConfirm"]: "",
      }));
    }
  };

  return {
    formState,
    errors,
    phoneSegments,
    verificationCode,
    isDuplicated,
    isVerified,
    isLoading,
    isFormValid,

    handleFormChange,
    handlePhoneChange,
    handleDuplicateEmail,
    handleVerificationCodeChange,
    handleSubmitVerificationCode,
    sendEmail,
    getFieldState,
    handleSubmit,
    handleCancel,
    resetField,
  };
};

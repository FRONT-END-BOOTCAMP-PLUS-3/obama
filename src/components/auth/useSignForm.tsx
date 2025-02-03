import apiClient from "@/infrastructure/api/apiClient";
import {
  validateBirthDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateVerificationCode,
} from "@/utils/auth/validate";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

type FromType = "email" | "password" | "passwordConfirm"| "birthDate" | "name" | "phone";

interface FormState {
  email: string;
  password: string;
  passwordConfirm: string;
  birthDate: string;
  name: string;
  phone: string;
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

// 1. send Email 시 유효성 검사 필요
// 2. send Email 같은 경우 중복검사 disabled되면
// 3. 이메일 인증 같은 경우 인증 완료 시 disabled
// 4. passwordConfirm password와 일치하는지만
// 5. 모든 유효성 검사는 실시간으로 확인 할것   //유효성 검사는 utils에 저장
// 6. form의 들어갈 데이터 -> { email, password, name, phone }
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

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

  const handleChange = useCallback(
    (key: FromType) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\s+/g, "");
      setFormState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleVerificationCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\s+/g, "");
      setVerificationCode(value);
    },
    []
  );

  const handleSubmitVerificationCode = useCallback(async () => {
    try {
      const response = await apiClient.post("api/auth/verify-code", {
        email: formState.email,
        verificationCode: verificationCode,
      });

      const data = await response.data;

      setIsVerified(data.isVerified);

      if (data.isVerified) {
        setMessage(data.message);
      } else {
        setMessage(data.error || "인증 코드가 잘못되었습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  }, [verificationCode]);

  const sendEmail = useCallback(async () => {
    if (!validateEmail(formState.email)) {
      console.log("올바른 이메일을 입력하세요.");
      return;
    }
    try {
      const response = await apiClient.post("api/auth/send-email", {
        email: formState.email,
      });
      console.log("✅ 인증 코드가 발송되었습니다.", response.data);
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("알수 없는 서버오류");
      }
    }
  }, [formState.email]);

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
        console.log("모든 입력 필드를 올바르게 작성해주세요.");
        return;
      }

      if (!isVerified) {
        console.log("인증이 완료되지 않았습니다.");
        return;
      }

      setIsLoading(true);

      try {
        const response = await apiClient.post("api/auth/signup", {
          signUpRequest,
        });
        setMessage(response.data.message || "회원가입 성공");
      } catch (error: unknown) {
        console.error(error);

        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage("알 수 없는 서버 오류 발생");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [formState, isFormValid, isVerified]
  );

  return {
    formState,
    errors,
    verificationCode,
    isVerified,
    isLoading,
    isFormValid,
    message,
    handleChange,
    handleVerificationCodeChange,
    handleSubmitVerificationCode,
    sendEmail,
    handleSubmit,
  };
};

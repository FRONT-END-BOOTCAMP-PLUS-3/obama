import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateVerificationCode,
} from "@/utils/auth/validate";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

type FromType = "email" | "password" | "passwordConfirm" | "name" | "phone";

interface FormState {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
}
interface FormErrors {
  email?: string;
  password?: string;
  passwordConfirm?: string;
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

export const useSignUpForm = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [verificationCode, setVerificationCode] = useState<string>("");
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

  const handleSubmitVerificationCode = useCallback(() => {
    console.log("인증 코드 확인 중...");

    if (verificationCode === "123456") {
      // 예: "123456"이 올바른 인증 코드라고 가정
      setIsVerified(true);
      console.log("인증이 완료되었습니다!");
    } else {
      setIsVerified(false);
      console.log("인증 코드가 잘못되었습니다.");
    }
  }, [verificationCode]);

  const sendEmail = useCallback(() => {
    if (!validateEmail(formState.email)) {
      console.log("올바른 이메일을 입력하세요.");
      return;
    }

    console.log("이메일 발송 요청 중...");
    setIsLoading(true);

    setTimeout(() => {
      console.log("인증 코드가 발송되었습니다.");
      setIsLoading(false);
    }, 2000); // API 호출 대기 시간 시뮬레이션
  }, [formState.email]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!isFormValid) {
        console.log("모든 입력 필드를 올바르게 작성해주세요.");
        return;
      }

      if (!isVerified) {
        console.log("인증이 완료되지 않았습니다.");
        return;
      }

      console.log("회원가입 요청 중...");
      setIsLoading(true);

      setTimeout(() => {
        console.log("회원가입이 완료되었습니다.", formState);
        setIsLoading(false);
      }, 2000); // API 호출 대기 시간 시뮬레이션
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
    handleChange,
    handleVerificationCodeChange,
    handleSubmitVerificationCode,
    sendEmail,
    handleSubmit,
  };
};

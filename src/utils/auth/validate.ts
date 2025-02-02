const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;
const PHONE_REGEX = /^[0-9]+$/;
const NAME_REGEX = /^[a-zA-Z가-힣]+$/;
const VERIFICATION_CODE_REGEX = /^\d{6}$/;

export const validateEmail = (email: string): string | undefined => {

    const emailValue = email.trim();
    
    if (!emailValue) {
        return "이메일을 입력해주세요";
    }

    if (!EMAIL_REGEX.test(emailValue)) {
        return "올바른 이메일 형식이 아닙니다."
    }
};

export const validatePassword = (password: string): string | undefined => {
    const passwordValue = password.replace(/\s+/g, "");
    if(!passwordValue)
        return "비밀번호를 입력해주세요"

    if (passwordValue.length < PASSWORD_MIN_LENGTH || passwordValue.length > PASSWORD_MAX_LENGTH) 
        return `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상 ${PASSWORD_MAX_LENGTH}자 이하로 입력해주세요.`;
    
    if (!/[a-z]/.test(passwordValue)) 
        return "비밀번호는 소문자를 포함해야 합니다.";
    
    if (!/[0-9]/.test(passwordValue)) 
        return "비밀번호는 숫자를 포함해야 합니다.";
    
    if (!/[!@#$%^&*]/.test(passwordValue)) 
        return "비밀번호는 특수문자(!@#$%^&*)를 포함해야 합니다.";
}

export const validateName = (name: string): string | undefined => {
    const nameValue = name.replace(/\s+/g, ""); // 모든 공백 제거
    if (!nameValue) {
        return "이름을 입력해주세요.";
    }

    if (!NAME_REGEX.test(nameValue)) {
        return "이름은 영어 또는 한글만 입력 가능합니다.";
    }
};

export const validatePhone = (phone: string): string | undefined => {
    const phoneValue = phone.replace(/\s+/g, ""); // 모든 공백 제거
    if (!phoneValue) {
        return "전화번호를 입력해주세요.";
    }

    if (!PHONE_REGEX.test(phoneValue)) {
        return "전화번호는 숫자만 입력 가능합니다.";
    }
};

export const validateVerificationCode = (code: string): string | undefined => {
    const verificationCodeValue = code.replace(/\s+/g, ""); // 모든 공백 제거

    if (!verificationCodeValue) {
        return "인증 코드를 입력해주세요.";
    }

    if (!VERIFICATION_CODE_REGEX.test(verificationCodeValue)) {
        return "인증 코드는 숫자 6자리여야 합니다.";
    }
};

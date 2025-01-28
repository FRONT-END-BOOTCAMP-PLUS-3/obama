const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;
const PHONE_REGEX = /^[0-9]+$/;
const NAME_REGEX = /^[a-zA-Z가-힣]+$/;
const VERIFICATION_CODE_REGEX = /^\d{6}$/;

export const validateEmail = (email: string): string | undefined => {

    const value = email.trim();
    
    if (!value) {
        return "이메일을 입력해주세요";
    }

    if (!EMAIL_REGEX.test(value)) {
        return "올바른 이메일 형식이 아닙니다."
    }
};

export const validatePassword = (password: string): string | undefined => {
    const value = password.replace(/\s+/g, "");
    if(!value)
        return "비밀번호를 입력해주세요"

    if (value.length < PASSWORD_MIN_LENGTH || value.length > PASSWORD_MAX_LENGTH) 
        return `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상 ${PASSWORD_MAX_LENGTH}자 이하로 입력해주세요.`;
    
    if (!/[a-z]/.test(value)) 
        return "비밀번호는 소문자를 포함해야 합니다.";
    
    if (!/[0-9]/.test(value)) 
        return "비밀번호는 숫자를 포함해야 합니다.";
    
    if (!/[!@#$%^&*]/.test(value)) 
        return "비밀번호는 특수문자(!@#$%^&*)를 포함해야 합니다.";
}

export const validateName = (name: string): string | undefined => {
    const value = name.replace(/\s+/g, ""); // 모든 공백 제거
    if (!value) {
        return "이름을 입력해주세요.";
    }

    if (!NAME_REGEX.test(value)) {
        return "이름은 영어 또는 한글만 입력 가능합니다.";
    }
};

export const validatePhone = (phone: string): string | undefined => {
    const value = phone.replace(/\s+/g, ""); // 모든 공백 제거
    if (!value) {
        return "전화번호를 입력해주세요.";
    }

    if (!PHONE_REGEX.test(value)) {
        return "전화번호는 숫자만 입력 가능합니다.";
    }
};

export const validateVerificationCode = (code: string): string | undefined => {
    const value = code.replace(/\s+/g, ""); // 모든 공백 제거

    if (!value) {
        return "인증 코드를 입력해주세요.";
    }

    if (!VERIFICATION_CODE_REGEX.test(value)) {
        return "인증 코드는 숫자 6자리여야 합니다.";
    }
};
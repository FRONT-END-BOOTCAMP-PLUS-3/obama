export interface VerificationCode {
    email: string;
    code: string;
    expiresAt: Date;
}
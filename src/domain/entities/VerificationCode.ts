export interface VerificationCode {
    email: string;
    code: string;
    expires_at: Date;
}
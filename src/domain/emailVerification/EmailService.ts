export interface EmailService {
    sendEmail(to: string, verificationCode: string): Promise<void>;
}
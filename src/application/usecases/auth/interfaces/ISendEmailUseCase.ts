export interface ISendEmailUseCase {
    sendEmail(to: string, verificationCode: string): Promise<void>;
}
import { EmailService } from "@/domain/emailVerification/EmailService";
import { GenerateVerificationCodeUseCase } from "@/application/auth/usecases/GenerateVerificationCodeUseCase";

export class SendEmailUseCase {
  constructor(private emailService: EmailService,
    private generateVerificationCodeUseCase : GenerateVerificationCodeUseCase
  ) {}

  async execute(email: string): Promise<void> {
    if (!email) {
      throw new Error("이메일을 입력해야 합니다.");
    }
    const verificationCode = this.generateVerificationCodeUseCase.execute();
    console.log(`🔹 생성된 인증 코드: ${verificationCode}`);

    await this.emailService.sendEmail(email, verificationCode);
  }
}
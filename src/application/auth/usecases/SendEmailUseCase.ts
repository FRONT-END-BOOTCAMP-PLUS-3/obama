import  nodemailer  from 'nodemailer';
import { EmailService } from "@/domain/emailVerification/EmailService";
import { GenerateVerificationCodeUseCase } from "@/application/auth/usecases/GenerateVerificationCodeUseCase";
import { IVerificationRepository } from "@/domain/repositories/IVerificationRepository";
import { serverConfig } from '@/config/serverEnv';
import { sendEmailTemplate } from '@/styles/email/sendEmailTemplate';

export class SendEmailUseCase {
  private transporter;
  constructor(private emailService: EmailService,
    private generateVerificationCodeUseCase : GenerateVerificationCodeUseCase,
    private verificationRepository : IVerificationRepository
  ) {
    this.transporter = nodemailer.createTransport({
          host: serverConfig.SMTP_HOST,
          port: serverConfig.SMTP_PORT,
          secure: false,
          auth: {
            user: serverConfig.SMTP_USER_EMAIL,
            pass: serverConfig.SMTP_PASSWORD,
          },
        });
  }

  async execute(email: string): Promise<void> {
    if (!email) 
      throw new Error("이메일을 입력해야 합니다.");
    
    const verificationCode = this.generateVerificationCodeUseCase.execute();
    console.log(`🔹 생성된 인증 코드: ${verificationCode}`);

    await this.verificationRepository.saveVerificationCode(email, verificationCode, 300);

        const emailHtml = sendEmailTemplate(verificationCode);
        const mailOptions = {
          from: `"Sotok Company" <${serverConfig.SMTP_USER_EMAIL}>`,
          to:email,
          subject: "Sotok 이메일 인증 코드",
          html: emailHtml,
        };
        await this.transporter.sendMail(mailOptions);
      
  }
}
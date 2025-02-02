import nodemailer from "nodemailer";
import { EmailService } from "@/domain/emailVerification/EmailService";
import { config } from "@/config/env";
import { generateEmailHtml } from "@utils/email/generateEmailHtml";

export class SMTPEmailService implements EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: false,
      auth: {
        user: config.SMTP_USER_EMAIL,
        pass: config.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, verificationCode: string): Promise<void> {
    const emailHtml = generateEmailHtml(verificationCode);
    const mailOptions = {
      from: `"Sotok Company" <${config.SMTP_USER_EMAIL}>`,
      to,
      subject: "Sotok 이메일 인증 코드",
      html: emailHtml,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

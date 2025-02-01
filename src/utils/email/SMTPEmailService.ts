import nodemailer from "nodemailer";
import { EmailService } from "@/domain/emailVerification/EmailService";
import { config } from "@/config/env";
import { generateEmailHtml } from "./generateEmailHtml";

export class SMTPEmailService implements EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER_EMAIL,
        pass: process.env.SMTP_PASSWORD,
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

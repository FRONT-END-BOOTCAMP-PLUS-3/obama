import { GenerateVerificationCodeUseCase } from "@/application/usecases/auth/GenerateVerificationCodeUseCase";
import { SendEmailUseCase } from "@/application/usecases/auth/SendEmailUseCase";
import { SMTPEmailService } from "@/infrastructure/email-server/SMTPEmailService";
import { RdVerificationRepository } from "@/infrastructure/repositories/auth/RdVerificationRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("SendEmail Axios connect");

  try {
    const { email } = await req.json();

    if (!email) {
      // 입력 에러 시
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Infrastructure Layer DI 의존성 주입
    const emailService = new SMTPEmailService();
    const generateVerificationCodeUseCase = new GenerateVerificationCodeUseCase();
    const verificationRepository = new RdVerificationRepository();

    const sendEmailUseCase = new SendEmailUseCase(
      emailService,
      generateVerificationCodeUseCase,
      verificationRepository
    );

    //usecase 실행
    await sendEmailUseCase.execute(email);

    // 성공 시 확인 메시지
    return NextResponse.json(
      { message: "Email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    // server에러 코드 및 메시지
    console.error("Email send Error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

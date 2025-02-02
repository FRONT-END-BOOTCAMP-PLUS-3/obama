import { VerifyCodeUseCase } from "@/application/auth/usecases/VerifyCodeUseCase";
import { RdVerificationRepository } from "@/infrastructure/repositories/auth/RdVerificationRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    
    try {
        const { email, verificationCode } = await req.json();

        if(!email || !verificationCode ) {
            return NextResponse.json({error: "이메일과 인증 코드를 입력해야합니다."}, {status:400});
        } 

        const verificationRepository = new RdVerificationRepository();
        const verifyCodeUseCase = new VerifyCodeUseCase(verificationRepository);

        const isValid = await verifyCodeUseCase.execute(email, verificationCode);

        if(!isValid) {
            return NextResponse.json({error: "인증 코드가 올바르지 않습니다."}, {status: 400});
        }

        return NextResponse.json({message: "이메일 인증이 완료되었습니다."}, {status: 200});

    } catch (error) {
        console.error("❌ 인증 코드 검증 오류:", error);
        return NextResponse.json({error: "서버 오류 발생"}, {status: 500});
    }

};
import { CheckVerificationCodeUseCase } from "@/application/usecases/auth/CheckVerificationCodeUseCase";
import { DeleteVerificationCodeUseCase } from "@/application/usecases/auth/DeleteVerificationCodeUseCase";
import { RdVerificationRepository } from "@/infrastructure/repositories/auth/RdVerificationRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    
    try {
        // Client Request json parsed
        const { email, verificationCode } = await req.json();
        
        // 2차 유효성 검사
        if(!email || !verificationCode ) {
            return NextResponse.json({error: "이메일과 인증 코드를 입력해야합니다."}, {status:400});
        } 
        // Repository 
        const verificationRepository = new RdVerificationRepository();
        
        // UseCases (DI적용) 
        const checkCodeUseCase = new CheckVerificationCodeUseCase(verificationRepository);
        const deleteCodeUseCase = new DeleteVerificationCodeUseCase(verificationRepository);

        // 인증 상태
        const isValid = await checkCodeUseCase.execute(email, verificationCode);

        // 코드 인증 실패시
        if(!isValid) {
            return NextResponse.json({ error: "인증 코드가 잘못되었습니다.", isVerified: false }, { status: 400 });
        }
        // 코등 인증 성공 시
        await deleteCodeUseCase.execute(email);
        return NextResponse.json({ message: "인증이 완료되었습니다.", isVerified: true }, { status: 200 });

        // 서버 오류 시
    } catch (error) {
        console.error("❌ 인증 코드 검증 오류:", error);
        return NextResponse.json({error: "서버 오류 발생"}, {status: 500});
    }

};
import { PasswordVerificationUseCase } from '@/application/usecases/auth/PasswordVerificationUseCase';
import { LoginRequestDto } from "@/application/usecases/auth/dtos/LoginRequestDto";
import { LoginResponseDto } from "@/application/usecases/auth/dtos/LoginResponseDto";
import { LoginError, LoginErrorType } from "@/application/usecases/auth/errors/LoginError";
import { LoginUseCase } from "@/application/usecases/auth/LoginUseCase";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";
import { IPasswordVerificationUseCase } from '@/application/usecases/auth/interfaces/IPasswordVerificationUseCase';

export async function POST(req: NextRequest) {
    console.log("👌login API POST request");

  try {
    const request :LoginRequestDto = await req.json()
    console.log(request);
    
    // Infrastructure UserRepository
    const userRepository: IUserRepository = new SbUserRepository();

    // 비밀번호 hash UseCase
    const passwordVerificationUseCase: IPasswordVerificationUseCase = new PasswordVerificationUseCase();
    
    // LoginUseCase DI 적용
    const loginUseCase = new LoginUseCase(userRepository, passwordVerificationUseCase);
    
    // 로그인 기능 실행
    const loginResponseDto :LoginResponseDto = await loginUseCase.execute(request);
    
    // responseDto 데이터 연결 확인
    console.log(loginResponseDto)
    
    // 로그인 성공 시 전달 메시지;
    return NextResponse.json(loginResponseDto, {status:200});

    // 로그인 실패 시 전달 메시지
} catch (error) {
    console.error("❌ 로그인 오류", error);

    if(error instanceof LoginError){
      const errorMapping: Record<LoginErrorType, {message: string; status: number}> = {
        MISSING_CREDENTIALS: {
          message: "이메일과 비밀번호를 모두 입력해주세요.",
          status: 400,
        },
        EMAIL_NOT_FOUND: {
          message: "가입되지 않은 이메일입니다. 회원가입 후 이용해주세요.",
          status: 401,
        },
        INVALID_PASSWORD: {
          message: "비밀번호가 올바르지 않습니다. 다시 시도해주세요.",
          status: 401,
        },

        UNKNOWN_ERROR: {
          message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          status: 500,
        },
      };

      const response = errorMapping[error.type] || errorMapping["UNKNOWN_ERROR"];
      return NextResponse.json({error: response.message}, {status: response.status});
    }

    return NextResponse.json(
      {error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."}, {status: 500}
    );
  }
}

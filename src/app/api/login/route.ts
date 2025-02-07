import { LoginRequestDto } from "@/application/usecases/auth/dtos/LoginRequestDto";
import { LoginError, LoginErrorType } from "@/application/usecases/auth/errors/LoginError";
import { ILoginUseCase } from "@/application/usecases/auth/interfaces/ILoginUseCase";
import { IPasswordHasherUseCase } from "@/application/usecases/auth/interfaces/IPasswordHasherUseCase";
import { LoginUseCase } from "@/application/usecases/auth/LoginUseCase";
import { PasswordHasherUseCase } from "@/application/usecases/auth/PasswordHasherUseCase";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("👌login API POST request");

  try {
    const request :LoginRequestDto = await req.json()
    
    // 로그인 요청 시 빈데이터 유효성 검사
    if (!request.email ||!request.password) {
      return NextResponse.json({ error: "" }, { status: 401 });
    }

    // Infrastructure UserRepository
    const userRepository: IUserRepository = new SbUserRepository();

    // 비밀번호 hash UseCase
    const passwordHasherUseCase: IPasswordHasherUseCase = new PasswordHasherUseCase();
    
    // LoginUseCase DI 적용
    const loginUseCase:ILoginUseCase  = new LoginUseCase(userRepository, passwordHasherUseCase);
    
    // 로그인 기능 실행
    const user = loginUseCase.execute(request);
    
    // 로그인 성공 시 전달 메시지;
    return NextResponse.json(user, {status:200});

  
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

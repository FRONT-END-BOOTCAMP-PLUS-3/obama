import { UpdateUserUseCase } from '@/application/usecases/auth/UpdateUserUseCase';
import { GetUserIdUseCase } from "@/application/usecases/auth/GetUserIdUseCase";
import { IPasswordHasherUseCase } from "@/application/usecases/auth/interfaces/IPasswordHasherUseCase";
import { PasswordHasherUseCase } from "@/application/usecases/auth/PasswordHasherUseCase";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    console.log(request);
    if (!request) {
      return NextResponse.json(
        { error: "모든 필드를 입력해야 합니다." },
        { status: 400 }
      );
    }

    // DB 의존성 주입
    const userRepository: IUserRepository = new SbUserRepository();
    const getUserIdUseCase = new GetUserIdUseCase(userRepository);

    const userId = await getUserIdUseCase.execute(request);

    if (!userId) {
      return NextResponse.json(
        { error: "존재하지 않은 사용자 정보입니다." },
        { status: 403 }
      );
    }

    return NextResponse.json({ userId }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try{
    const { userId, password } = await req.json();
    if (!userId ||!password) {
      return NextResponse.json({ error: "userId와 password는 필수 입력값입니다." }, { status: 400 });
    }
    
    // 비밀번호 해싱 작업
    const passwordHasher: IPasswordHasherUseCase = new PasswordHasherUseCase();
    const hashedPassword = await passwordHasher.execute(password); // 🔒 비밀번호 해싱

    // UserRepository 주입 및 UseCase 실행    
    const userRepository : IUserRepository = new SbUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(userRepository); 

    // dto변환
    const isUpdate = await updateUserUseCase.execute({
      userId, 
      field:"password",
      newValue:hashedPassword
    });

    if(!isUpdate){
      return NextResponse.json({ error: "비밀번호 변경 실패" }, { status: 500 });
    }
    return NextResponse.json({ success: true }, { status: 200 });

  } catch(error) {
    console.error(error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

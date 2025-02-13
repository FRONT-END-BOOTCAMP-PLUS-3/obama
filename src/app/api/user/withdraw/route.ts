import { DeleteUserUseCase } from "@/application/usecases/auth/DeleteUserUseCase";
import { PasswordVerificationUseCase } from "@/application/usecases/auth/PasswordVerificationUseCase";
import { VerifyPasswordUseCase } from "@/application/usecases/auth/VerifyPasswordUseCase";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {

  try {
    const { userId, password } = await req.json();
    if (!userId || !password) {
      return NextResponse.json(
        { error: "모든 필드를 입력해야 합니다." },
        { status: 400 }
      );
    }

    // 의존성 주입
    const userRepository: IUserRepository = new SbUserRepository();
    const passwordVerificationUseCase = new PasswordVerificationUseCase();
    const verifyPasswordUseCase = new VerifyPasswordUseCase(userRepository, passwordVerificationUseCase);

    const deleteUserUseCase = new DeleteUserUseCase(userRepository,verifyPasswordUseCase);

    // 실행
    const deleteSuccess = await deleteUserUseCase.execute(userId, password);

    if(!deleteSuccess) {
      return NextResponse.json({ error: "비밀번호가 일치하지 않습니다." }, { status: 401 });
    }
    return NextResponse.json({message: "회원이 삭제 되었습니다."}, { status: 200 });

  } catch (error) {
    console.error("❌ 사용자 삭제 오류:", error);
    return NextResponse.json({ error: "Internal Server Error" },{ status: 500 });
  }
}

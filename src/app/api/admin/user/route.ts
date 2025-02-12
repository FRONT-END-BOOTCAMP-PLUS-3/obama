import { DeleteUserByAdminUseCase } from "@/application/usecases/admin/user/DeleteUserByAdminUseCase";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  console.log("🔥 관리자 회원 삭제 API 요청 수신");

  try {
    const { userId, role } = await req.json();
    if (!role || !userId) {
      return NextResponse.json(
        { error: "모든 필드를 입력해야 합니다." },
        { status: 400 }
      );
    }
    if (role !== "admin") {
      return NextResponse.json(
        { error: "관리자 권한이 필요합니다." },
        { status: 403 }
      );
    }

    // 1️⃣ UserRepository & UseCase 인스턴스 생성
    const userRepository: IUserRepository = new SbUserRepository();
    const deleteUserByAdminUseCase = new DeleteUserByAdminUseCase(userRepository);

    // 2️⃣ 관리자 권한 확인 후 회원 삭제
    const deleteSuccess = await deleteUserByAdminUseCase.execute(userId);
    if (!deleteSuccess) {
      return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
    return NextResponse.json({ message: "Delete Success" }, { status: 200 });
  } catch (error) {
    console.error(" 관리자 회원 삭제 오류:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

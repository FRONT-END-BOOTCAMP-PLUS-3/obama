import { DeleteUserByAdminUseCase } from "@/application/usecases/admin/user/DeleteUserByAdminUseCase";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";
import { FindAllUsersUseCase } from "@/application/usecases/admin/user/FindallUsersUseCase";

export async function GET(_req: NextRequest) {

  try {
    const userRepository = new SbUserRepository();
    const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);

    const users = await findAllUsersUseCase.execute();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(" 관리자 유저 조회 오류:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {

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

    // 1 UserRepository & UseCase 인스턴스 생성
    const userRepository: IUserRepository = new SbUserRepository();
    const deleteUserByAdminUseCase = new DeleteUserByAdminUseCase(userRepository);

    // 2️ 관리자 권한 확인 후 회원 삭제
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

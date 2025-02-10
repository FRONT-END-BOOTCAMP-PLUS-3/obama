import { NextResponse } from "next/server";
import { GetProfileUsecase } from "@/application/usecases/profile/GetProfileUsecase";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
// import { useAuthStore } from "@/stores/authStore"; 

export async function GET(req: Request) {
  // ✅ 로그인한 사용자의 userId 가져오기
  const { userId } = useAuthStore.getState();

  if (!userId) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const repository = new SbUserRepository();
    const usecase = new GetProfileUsecase(repository);
    const profile = await usecase.execute(userId);

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

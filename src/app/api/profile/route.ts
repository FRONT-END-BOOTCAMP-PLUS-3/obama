import { NextResponse } from "next/server";
import { ProfileHeaderUsecase } from "@/application/usecases/profile/ProfileHeaderUsecase";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { SbSNSRepository } from "@/infrastructure/repositories/profile/SbSNSRepository";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const userRepository = new SbUserRepository();
    const snsRepository = new SbSNSRepository();
    const getProfileHeaderUseCase = new ProfileHeaderUsecase(userRepository, snsRepository);

    const profileHeader = await getProfileHeaderUseCase.execute(userId);
    return NextResponse.json({ profileHeader }, { status: 200 });
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

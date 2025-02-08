import { NextResponse } from "next/server";
import { PrivacySettingsUsecase } from "@/application/usecases/profile/PrivacySettingsUsecase";
import { SbPrivacySettingRepository } from "@/infrastructure/repositories/profile/SbPrivacySettingRepository";

const privacySettingRepository = new SbPrivacySettingRepository();
const getPrivacySettingsUsecase = new PrivacySettingsUsecase(privacySettingRepository);

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId가 필요합니다." }, { status: 400 });
  }

  try {
    // UseCase를 활용하여 데이터 가져오기
    const aboutMeData = await getAboutMeUsecase.execute(userId);
    const privacySettings = await getPrivacySettingsUsecase.execute(userId);

    if (!profileDetails) {
      console.error("❌ Profile details not found");
      return NextResponse.json({ error: "Profile details not found" }, { status: 404 });
    }

    return NextResponse.json({ profileDetails, aboutMeData, privacySettings }, { status: 200 });
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

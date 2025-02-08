import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("✅ API 요청 들어옴 (App Router)");

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId가 필요합니다." }, { status: 400 });
  }

  try {
    // Axios를 사용하여 병렬 요청 처리
    const [profileDetails, aboutMeData, privacySettings] = await Promise.all([
      axios.get(`https://your-backend-api.com/profile/${userId}`).then((res) => res.data),
      axios.get(`https://your-backend-api.com/about-me/${userId}`).then((res) => res.data),
      axios.get(`https://your-backend-api.com/privacy-settings/${userId}`).then((res) => res.data),
    ]);

    if (!profileDetails) {
      console.error("❌ Profile details not found");
      return NextResponse.json({ error: "Profile details not found" }, { status: 404 });
    }

    console.log("✅ API 응답:", { profileDetails, aboutMeData, privacySettings });
    return NextResponse.json({ profileDetails, aboutMeData, privacySettings }, { status: 200 });
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

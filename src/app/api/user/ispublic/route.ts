import { NextResponse } from "next/server";
import { SbIsPublicRepository } from "@/infrastructure/repositories/profile/SbIsPublicRepository";
import { toCamelCase } from "@/utils/convert/convertToCase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "Invalid userId" }, { status: 400 });
    }

    const isPublicRepository = new SbIsPublicRepository();

    // ✅ `isPublic` 데이터 조회
    const isPublicData = await isPublicRepository.findByUserId(userId);
    if (!isPublicData || isPublicData.length === 0) {
      return NextResponse.json({ message: "No isPublic data found" }, { status: 404 });
    }

    return NextResponse.json({
      isPublic: toCamelCase(isPublicData), // ✅ `camelCase` 변환 적용
    }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { SbUserInputRepository } from "@/infrastructure/repositories/profile/SbUserInputRepository";
import { UserInput } from "@/domain/entities/profile/UserInput";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📥 Received Body:", body); // 요청 데이터 확인

    const { category_id, answer, user_id } = body;

    const userRepository = new SbUserRepository();

    // ✅ 유저 기본 정보 조회
    const userResult = await userRepository.findUserById(userId);
    if (!userResult) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: toCamelCase(userResult.user),
    }, { status: 200 });

  } catch (error) {
    console.error("❌ Error in POST /api/profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

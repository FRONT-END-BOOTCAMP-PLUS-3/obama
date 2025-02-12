import { NextResponse } from "next/server";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { toCamelCase } from "@/utils/convert/convertToCase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "Invalid userId" }, { status: 400 });
    }

    const userRepository = new SbUserRepository();

    // ✅ 유저 기본 정보 조회
    const userResult = await userRepository.findUserById(userId);
    if (!userResult) {
      return NextResponse.json({ message: "User not found" }, { status: 403 });
    }

    return NextResponse.json({
      user: toCamelCase(userResult.user),
    }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
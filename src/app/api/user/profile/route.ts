import { NextResponse } from "next/server";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";

export async function GET(request: Request) {
  try {
    // URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "Invalid userId" }, { status: 400 });
    }

    // SbUserRepository를 사용해 데이터 조회
    const userRepository = new SbUserRepository();
    const result = await userRepository.findUserById(userId);

    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 패스워드를 제외한 유저 데이터를 반환
    const { password, ...user } = result;

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

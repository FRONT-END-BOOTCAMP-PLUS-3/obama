import { NextResponse } from "next/server";
import { SbUserInputRepository } from "@/infrastructure/repositories/profile/SbUserInputRepository";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "Invalid userId" }, { status: 400 });
    }

    const userInputRepository = new SbUserInputRepository();

    // ✅ 유저의 userInput 데이터 조회
    const userInputs = await userInputRepository.findAllByUserId(userId);
    if (!userInputs) {
      return NextResponse.json({ message: "No user input found" }, { status: 404 });
    }

    // ✅ 데이터 변환 없이 원본 데이터 반환
    return NextResponse.json(userInputs, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

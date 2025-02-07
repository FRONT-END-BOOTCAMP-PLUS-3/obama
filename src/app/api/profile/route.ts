import { NextRequest, NextResponse } from "next/server";
import { SbUserInputRepository } from "@/infrastructure/repositories/profile/SbUserInputRepository";
import { UserInput } from "@/domain/entities/profile/UserInput";

const userInputRepository = new SbUserInputRepository();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📥 Received Body:", body); // 요청 데이터 확인

    const { category_id, answer, user_id } = body;

    // ✅ 필수 필드 검사
    if (!category_id || !answer || !user_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ 올바른 데이터 타입 확인
    if (
      typeof category_id !== "number" ||
      typeof answer !== "string" ||
      typeof user_id !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid data types" },
        { status: 400 }
      );
    }

    // ✅ 데이터 저장
    const newUserInput: Omit<UserInput, "userInput_id"> = {
      category_id,
      answer,
      user_id,
    };

    const result = await userInputRepository.create(newUserInput);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("❌ Error in POST /api/profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

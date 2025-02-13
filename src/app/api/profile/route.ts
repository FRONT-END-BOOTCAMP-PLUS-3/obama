import { NextRequest, NextResponse } from "next/server";
import { SbUserInputRepository } from "@/infrastructure/repositories/profile/SbUserInputRepository";
import { UserInput } from "@/domain/entities/profile/UserInput";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { category_id, answer, user_id } = body;

    if (!category_id || !answer || !user_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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

    const userInputRepository = new SbUserInputRepository();

    // ✅ 기존 값이 있으면 수정, 없으면 생성
    const newUserInput: Omit<UserInput, "userInput_id"> = {
      category_id,
      answer,
      user_id,
    };

    const result = await userInputRepository.createOrUpdate(newUserInput);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("❌ Error in POST /api/profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

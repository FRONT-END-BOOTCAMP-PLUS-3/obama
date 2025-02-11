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
    const result = await userRepository.findUserById(userId);

    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // ✅ 중첩된 `user` 감싸기 제거
    return NextResponse.json({user: toCamelCase(result.user)}, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { toCamelCase } from "@/utils/convert/convertToCase";

export async function GET(
  _request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    console.log("params", params);
    if (!userId) {
      return NextResponse.json({ message: "Invalid userId" }, { status: 400 });
    }

    const userRepository = new SbUserRepository();
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

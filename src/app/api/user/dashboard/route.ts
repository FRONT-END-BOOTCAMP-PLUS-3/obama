import { UserUpdateDto } from "@/application/usecases/auth/dtos/UserUpdateDto";
import { GetUserUseCase } from "@/application/usecases/auth/GetUserUseCase";
import { IPasswordHasherUseCase } from "@/application/usecases/auth/interfaces/IPasswordHasherUseCase";
import { PasswordHasherUseCase } from "@/application/usecases/auth/PasswordHasherUseCase";
import { UpdateUserUseCase } from "@/application/usecases/auth/UpdateUserUseCase";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = await req.json();
    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      ); // Bad Request error code 400
    }

    const userRepository: IUserRepository = new SbUserRepository();
    const getUserUseCase = new GetUserUseCase(userRepository);

    const userResponseDto = await getUserUseCase.execute(userId);

    if (!userResponseDto) {
      return NextResponse.json(
        { message: "해당 유저가 존재하지 않습니다." },
        { status: 403 }
      ); // User not found error code 404
    }

    // 가입 성공시
    return NextResponse.json(userResponseDto, { status: 200 });
    // 가입 실패 시
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const userUpdateDto: UserUpdateDto = await req.json();

    if ( !userUpdateDto.userId || !userUpdateDto.field || !userUpdateDto.newValue) {
      return NextResponse.json(
        { message: "userId, filed, newValue are required" },
        { status: 400 }
      ); // Bad Request error code 400
    }

    // 의존성 주입
    const userRepository: IUserRepository = new SbUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(userRepository);

    if (userUpdateDto.field === "password") {

      const passwordHasher: IPasswordHasherUseCase = new PasswordHasherUseCase();
      const hashedPassword = await passwordHasher.execute(userUpdateDto.newValue); // 🔒 비밀번호 해싱
      userUpdateDto.newValue = hashedPassword;
    }

    const isUpdate = await updateUserUseCase.execute(userUpdateDto);

    if (!isUpdate)
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );

    return NextResponse.json(
      { message: "정보가 반영됩니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

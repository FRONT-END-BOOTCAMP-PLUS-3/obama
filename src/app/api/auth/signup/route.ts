import { SignUpRequestDTO } from "@/application/auth/dtos/SignUpRequestDto";
import { SignUpUseCase } from "@/application/auth/usecases/SignUpUseCase";
import { IPasswordHasher } from "@/application/common/usecases/interfaces/IPasswordHasherUseCase";
import { IUUIDGeneratorUseCase } from "@/application/common/usecases/interfaces/IUUIDGeneratorUseCase";
import { PasswordHasherUseCase } from "@/application/common/usecases/PasswordHasherUseCase";
import { UUIDGeneratorUseCase } from "@/application/common/usecases/UUIDGeneratorUseCase";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest){
    try {
        const userData: SignUpRequestDTO = await req.json();

        if (!userData.email || !userData.password || !userData.birthDate || !userData.name || !userData.phone) {
            return NextResponse.json({ error: "모든 필드를 입력해야 합니다." }, { status: 400 });
          }
        const userRepository:IUserRepository = new SbUserRepository();
        const uuidGenerator: IUUIDGeneratorUseCase = new UUIDGeneratorUseCase();
        const passwordHasher: IPasswordHasher = new PasswordHasherUseCase();

        const signUpUseCase:SignUpUseCase = new SignUpUseCase(userRepository, uuidGenerator, passwordHasher);

        await signUpUseCase.execute(userData)
        
        return NextResponse.json({message:"회원가입 성공"}, {status: 201});

    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}
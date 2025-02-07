import { SignUpRequestDTO } from "@/application/usecases/auth/dtos/SignUpRequestDto";
import { SignUpUseCase } from "@/application/usecases/auth/SignUpUseCase";
import { IPasswordHasher } from "@/application/usecases/auth/interfaces/IPasswordHasherUseCase";
import { IUUIDGeneratorUseCase } from "@/application/usecases/auth/interfaces/IUUIDGeneratorUseCase";
import { PasswordHasherUseCase } from "@/application/usecases/auth/PasswordHasherUseCase";
import { UUIDGeneratorUseCase } from "@/application/usecases/auth/UUIDGeneratorUseCase";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest){
    try {
        const {signUpRequest} = await req.json();
        const userData: SignUpRequestDTO = signUpRequest
        
        console.log(userData);
        if (!userData.email || !userData.password || !userData.birthDate || !userData.name || !userData.phone) {
            return NextResponse.json({ error: "모든 필드를 입력해야 합니다." }, { status: 400 });
          }

        //Repository create
        const userRepository:IUserRepository = new SbUserRepository();
        //UseCase service
        const uuidGenerator: IUUIDGeneratorUseCase = new UUIDGeneratorUseCase();
        const passwordHasher: IPasswordHasher = new PasswordHasherUseCase();
        
        // useCase (DI 적용)
        const signUpUseCase:SignUpUseCase = new SignUpUseCase(userRepository, uuidGenerator, passwordHasher);
        
        //useCase 함수 실행
        await signUpUseCase.execute(userData)
        // 가입 성공시
        return NextResponse.json({message:"회원가입 성공"}, {status: 201});
        // 가입 실패 시
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}
import { LoginRequestDto } from "@/application/usecases/auth/dtos/LoginRequestDto";
import { ILoginUseCase } from "@/application/usecases/auth/interfaces/ILoginUseCase";
import { IPasswordHasherUseCase } from "@/application/usecases/auth/interfaces/IPasswordHasherUseCase";
import { LoginUseCase } from "@/application/usecases/auth/LoginUseCase";
import { PasswordHasherUseCase } from "@/application/usecases/auth/PasswordHasherUseCase";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("👌login API POST request");

  try {
    const request :LoginRequestDto = await req.json()
    
    if (!request.email ||!request.password) {
      return NextResponse.json({ error: "" }, { status: 401 });
    }

    const userRepository: IUserRepository = new SbUserRepository();
    const passwordHasherUseCase: IPasswordHasherUseCase = new PasswordHasherUseCase();
    
    const loginUseCase:ILoginUseCase  = new LoginUseCase(userRepository, passwordHasherUseCase);
    
    loginUseCase.execute(request);
    

    return NextResponse.json({message: "로그인 성공"}, {status:201});
  
} catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

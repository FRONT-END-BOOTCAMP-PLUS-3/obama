import { FindEmailUseCase } from "@/application/usecases/auth/FindEmailUseCase";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
  const { name, phone } = await req.json();

  if (!name || !phone) { return NextResponse.json({ error: "모든 필드를 입력해야 합니다." }, { status: 400 });
  }


  // DB의존성 주입
  const userRepository: IUserRepository = new SbUserRepository();

  const findEmailUseCase = new FindEmailUseCase(userRepository);

  const email = await findEmailUseCase.execute(name, phone);

  if (!email) {
    return NextResponse.json({ error: "등록되지 않은 사용자입니다." }, { status: 400 });
  }
  return NextResponse.json({email}, { status: 200 });
} catch (error){
  console.error(error)
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}


  
}

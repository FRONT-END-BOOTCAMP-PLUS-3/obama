import { IDuplicateEmailUseCase } from "@/application/auth/interfaces/IDuplicateEmailUseCase";
import { DuplicateEmailUseCase } from "@/application/auth/usecases/DuplicateEmailUseCase";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { SbUserRepository } from "@/infrastructure/repositories/auth/SbUserRepository";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    console.log("check-email api mounted");
    try{
        const {email} = await req.json();

        if(!email || email.trim() === ""){
            return NextResponse.json({error: "이메일을 입력해주세요"}, {status: 400})
        }

        const userRepository:IUserRepository = new SbUserRepository();
        const duplicateEmailUseCase: IDuplicateEmailUseCase = new DuplicateEmailUseCase(userRepository);

        const isDuplicate = await duplicateEmailUseCase.execute(email);

        if(isDuplicate){
            return NextResponse.json({ message: "이미 사용 중인 이메일입니다.", isDuplicate: true }, { status: 200 });
        } else{
            return NextResponse.json({ message: "이메일을 사용할 수 있습니다.", isDuplicate: false }, { status: 200 });
        }

    } catch(error){
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
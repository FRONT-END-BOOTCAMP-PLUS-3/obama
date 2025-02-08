import { SbSmalltalkRepository } from "@/infrastructure/repositories/smalltalk/SbSmalltalkSubjectRepository";
import { GetSmalltalkSubjectsUsecase } from "@/application/usecases/smalltalk/smalltalkSubject/SmalltalkSubjectsUsecase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const repository = new SbSmalltalkRepository();
    const usecase = new GetSmalltalkSubjectsUsecase(repository);
    const subjects = await usecase.execute(); 

    return NextResponse.json({ subject: subjects }, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}


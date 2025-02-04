import { SbSmalltalkRepository } from "@/infrastructure/repositories/SbSmalltalkSubjectRepository";
import { GetSmalltalkSubjectsUsecase } from "@/application/common/usecases/smalltalkSubject/GetSmalltalkSubjectsUsecase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const repository = new SbSmalltalkRepository();
    const usecase = new GetSmalltalkSubjectsUsecase(repository);
    const subjects = await usecase.execute(); 

    return NextResponse.json({ data: subjects }, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from "next/server";
import { SbOpenQuestionRepository } from "@/infrastructure/repositories/smalltalk/SbOpenQuestionRepository";
import { OpenQuestionsUsecase } from "@/application/usecases/smalltalk/OpenQuestionUsecase";

export async function GET(request: NextRequest) {
  try {
    const repository = new SbOpenQuestionRepository();
    const usecase = new OpenQuestionsUsecase(repository);
    
    const allQuestions = await usecase.executeAll();
    
    return NextResponse.json({ questions: allQuestions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching open questions:", error);
    return NextResponse.json({ message: "Error fetching open questions" }, { status: 500 });
  }
}


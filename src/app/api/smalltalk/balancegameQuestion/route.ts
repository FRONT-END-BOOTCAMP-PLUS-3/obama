import { NextResponse } from "next/server";
import { BalancegameQuestionUsecase } from "@/application/usecases/smalltalk/smalltalkBalancegame/BalancegameQuestionUsecase";
import { SbBalancegameQuestionRepository } from "@/infrastructure/repositories/smalltalk/SbBalancegameQuestionRepository";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const subjectId = url.searchParams.get("subjectId");
  const numericSubjectId = Number(subjectId);

  if (!numericSubjectId) {
    return NextResponse.json({ message: "Invalid subjectId" }, { status: 400 });
  }

  try {
    const questionRepository = new SbBalancegameQuestionRepository();
    const useCase = new BalancegameQuestionUsecase(questionRepository);
    const question = await useCase.execute(numericSubjectId);

    if (!question) {
      return NextResponse.json({ message: "No question found" }, { status: 404 });
    }

    return NextResponse.json({ question }, { status: 200 });
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

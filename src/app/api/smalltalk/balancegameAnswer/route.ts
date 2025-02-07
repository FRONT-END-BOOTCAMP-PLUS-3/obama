import { NextResponse } from "next/server";
import { BalancegameAnswerUsecase } from "@/application/usecases/smalltalk/smalltalkBalancegame/BalancegameAnswerUsecase";
import { SbBalancegameAnswerRepository } from "@/infrastructure/repositories/smalltalk/SbBalancegameAnswerRepository";

/*API 경로 수정 예정입니다*/ 
export async function GET(request: Request) {
  const url = new URL(request.url);
  const questionId = url.searchParams.get("questionId");
  const numericQuestionId = Number(questionId);

  if (!numericQuestionId) {
    return NextResponse.json({ message: "Invalid questionId" }, { status: 400 });
  }

  try {
    const answerRepository = new SbBalancegameAnswerRepository();
    const useCase = new BalancegameAnswerUsecase(answerRepository);
    const answers = await useCase.execute(numericQuestionId);

    if (!answers) {
      return NextResponse.json({ message: "No answer found" }, { status: 404 });
    }

    return NextResponse.json({ answers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching answers:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
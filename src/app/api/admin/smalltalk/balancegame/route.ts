import { NextResponse } from "next/server";
import { SbBalancegameQuestionRepository } from "@/infrastructure/repositories/smalltalk/SbBalancegameQuestionRepository";
import { SbBalancegameAnswerRepository } from "@/infrastructure/repositories/smalltalk/SbBalancegameAnswerRepository";
import { BalancegameQuestionUsecase } from "@/application/usecases/smalltalk/BalancegameQuestionUsecase";
import { BalancegameAnswerUsecase } from "@/application/usecases/smalltalk/BalancegameAnswerUsecase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get("subjectId");

  if (!subjectId) {
    return NextResponse.json({ error: "subjectId is required" }, { status: 400 });
  }

  const questionRepo = new SbBalancegameQuestionRepository();
  const answerRepo = new SbBalancegameAnswerRepository();

  const questionUsecase = new BalancegameQuestionUsecase(questionRepo);
  const answerUsecase = new BalancegameAnswerUsecase(answerRepo);

  const questions = await questionUsecase.execute(Number(subjectId));

  const results = await Promise.all(
    questions.map(async (question) => {
      const answers = await answerUsecase.execute(question.balancegamequestionId);
      return {
        ...question,
        answers,
      };
    })
  );

  return NextResponse.json(results);
}

import { NextRequest, NextResponse } from "next/server";
import { BalancegameQuestionUsecase } from "@/application/usecases/smalltalk/smalltalkBalancegame/BalancegameQuestionUsecase";
import { SbBalancegameQuestionRepository } from "@/infrastructure/repositories/smalltalk/SbBalancegameQuestionRepository";
import { BalancegameAnswerUsecase } from "@/application/usecases/smalltalk/smalltalkBalancegame/BalancegameAnswerUsecase";
import { SbBalancegameAnswerRepository } from "@/infrastructure/repositories/smalltalk/SbBalancegameAnswerRepository";
import { SbOpenQuestionRepository } from "@/infrastructure/repositories/smalltalk/SbSmalltalkOpenQuestionRepository";
import { OpenQuestionsUsecase } from "@/application/usecases/smalltalk/smalltalkOpenQuestion/SmalltalkOpenQuestionUsecase";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const subjectId = id;

  if (!subjectId) {
    return NextResponse.json(
      { message: "Invalid or missing ID" },
      { status: 400 }
    );
  }
  const numericSubjectId = Number(subjectId);
  if (isNaN(numericSubjectId)) {
    return NextResponse.json({ message: "Invalid subjectId" }, { status: 400 });
  }

  const url = new URL(request.url);
  const route = url.searchParams.get("route");


  try {
    if (route === "balancegameQuestion") {
      const questionRepository = new SbBalancegameQuestionRepository();
      const useCase = new BalancegameQuestionUsecase(questionRepository);
      const question = await useCase.execute(numericSubjectId);

      if (!question) {
        return NextResponse.json({ message: "No question found" }, { status: 404 });
      }

      return NextResponse.json({ question }, { status: 200 });

    } else if (route === "balancegameAnswer") {
      const answerRepository = new SbBalancegameAnswerRepository();
      const useCase = new BalancegameAnswerUsecase(answerRepository);
      const answers = await useCase.execute(numericSubjectId);

      if (!answers) {
        return NextResponse.json({ message: "No answer found" }, { status: 404 });
      }

      return NextResponse.json({ answers }, { status: 200 });

    } else if (route === "openQuestion") {
      const repository = new SbOpenQuestionRepository();
      const usecase = new OpenQuestionsUsecase(repository);
      const questions = await usecase.execute(numericSubjectId);

      return NextResponse.json({ questions }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid API route" }, { status: 404 });

  } catch (error) {
    console.error(" API 처리 중 오류 발생:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

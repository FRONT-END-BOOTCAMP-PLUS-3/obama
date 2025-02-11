import { NextResponse } from "next/server";
import { SbBalancegameQuestionRepository } from "@/infrastructure/repositories/smalltalk/SbBalancegameQuestionRepository";
import { SbBalancegameAnswerRepository } from "@/infrastructure/repositories/smalltalk/SbBalancegameAnswerRepository";
import { BalancegameQuestionUsecase } from "@/application/usecases/smalltalk/BalancegameQuestionUsecase";
import { BalancegameAnswerUsecase } from "@/application/usecases/smalltalk/BalancegameAnswerUsecase";
import { CreateBalanceGameUsecase } from "@/application/usecases/smalltalk/CreateBalancegameUsecase";
import { UpdateBalancegameQuestionUsecase } from "@/application/usecases/smalltalk/UpdateBalancegameQuestionUsecase";
import { UpdateBalancegameAnswerUsecase} from "@/application/usecases/smalltalk/UpdateBalancegameAnswersUsecase";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subjectId, questionText, answerA, answerB } = body;
    if (
      !subjectId ||
      !questionText ||
      !answerA?.title ||
      !answerA?.text ||
      !answerB?.title ||
      !answerB?.text
    ) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const questionRepo = new SbBalancegameQuestionRepository();
    const answerRepo = new SbBalancegameAnswerRepository();

    const creationUsecase = new CreateBalanceGameUsecase(questionRepo, answerRepo);

    const result = await creationUsecase.execute({
      subjectId: Number(subjectId),
      questionText,
      answerA,
      answerB,
    });

    return NextResponse.json(
      {
        message: "Balancegame created successfully",
        data: result,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /balancegame error: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      questionId,
      questionText,
      answerId,
      answerTitle,
      answerText,
    } = body;

    const questionRepo = new SbBalancegameQuestionRepository();
    const answerRepo = new SbBalancegameAnswerRepository();


    const questionUpdateUsecase = new UpdateBalancegameQuestionUsecase(questionRepo);
    const answerUpdateUsecase = new UpdateBalancegameAnswerUsecase(answerRepo);

    if (questionId && typeof questionText === "string") {
      await questionUpdateUsecase.execute(questionId, questionText);
    }

    if (
      answerId &&
      typeof answerTitle === "string" &&
      typeof answerText === "string"
    ) {
      await answerUpdateUsecase.execute(answerId, answerTitle, answerText);
    }

    return NextResponse.json({ message: "Patch success" }, { status: 200 });
  } catch (error: any) {
    console.error("[PATCH balancegame] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



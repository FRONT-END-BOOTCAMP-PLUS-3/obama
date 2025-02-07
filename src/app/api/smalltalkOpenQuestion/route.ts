import { SbOpenQuestionRepository } from "@/infrastructure/repositories/smalltalk/SbSmalltalkOpenQuestionRepository";
import { OpenQuestionsUsecase } from "@/application/usecases/smalltalk/smalltalkOpenQuestion/SmalltalkOpenQuestionUsecase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const subjectId = url.searchParams.get("subjectId");
    const numericSubjectId = Number(subjectId);

    if (!subjectId || isNaN(numericSubjectId)) {
      return NextResponse.json(
        { error: "subjectId must be a valid number" },
        { status: 400 }
      );
    }

    const repository = new SbOpenQuestionRepository();
    const ItemListUsecase = new OpenQuestionsUsecase(repository);
    const questions = await ItemListUsecase.execute(numericSubjectId);

    return NextResponse.json({ questions }, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch open questions:", err);
    return NextResponse.json(
      { error: "Failed to fetch open questions" },
      { status: 500 }
    );
  }
}

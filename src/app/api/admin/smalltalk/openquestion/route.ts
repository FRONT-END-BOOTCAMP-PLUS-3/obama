import { NextRequest, NextResponse } from "next/server";
import { SbOpenQuestionRepository } from "@/infrastructure/repositories/smalltalk/SbOpenQuestionRepository";
import { CreateOpenQuestionUsecase } from "@/application/usecases/smalltalk/CreateOpenQuestionUsecase";
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

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json(); 

    const { subjectId, openQuestion } = requestData; 
    if (!subjectId || !openQuestion) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const repository = new SbOpenQuestionRepository();
    const usecase = new CreateOpenQuestionUsecase(repository);
    const updatedQuestions = await usecase.execute(subjectId, openQuestion);

    return NextResponse.json({ questions: updatedQuestions }, { status: 200 });
  } catch (error) {
    console.error("Error adding question:", error);
    return NextResponse.json({ message: "Error adding question" }, { status: 500 });
  }
}



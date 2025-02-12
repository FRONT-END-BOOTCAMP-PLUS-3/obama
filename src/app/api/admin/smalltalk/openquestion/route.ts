import { NextRequest, NextResponse } from "next/server";
import { SbOpenQuestionRepository } from "@/infrastructure/repositories/smalltalk/SbOpenQuestionRepository";
import { CreateOpenQuestionUsecase } from "@/application/usecases/admin/openquestion/CreateOpenQuestionUsecase";
import { OpenQuestionsUsecase } from "@/application/usecases/smalltalk/OpenQuestionUsecase";
import { UpdateOpenQuestionUsecase } from "@/application/usecases/admin/openquestion/UpdateOpenQuestionUsecase";
import { DeleteOpenQuestionUsecase } from "@/application/usecases/admin/openquestion/DeleteOpenQuestionUsecase";

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

export async function PATCH(request: NextRequest) {
  try {
    const requestData = await request.json();
    const { questionId, openQuestion } = requestData;

    if (!questionId || !openQuestion) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const repository = new SbOpenQuestionRepository();
    const usecase = new UpdateOpenQuestionUsecase(repository);

    await usecase.execute(questionId, openQuestion); 

    return NextResponse.json({ message: "Question updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json({ message: "Error updating question" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { questionId } = await request.json();

    if (!questionId) {
      return NextResponse.json({ message: "Missing required field: questionId" }, { status: 400 });
    }

    const repository = new SbOpenQuestionRepository();
    const usecase = new DeleteOpenQuestionUsecase(repository);

    await usecase.execute(questionId);

    return NextResponse.json({ message: "Question deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json({ message: "Error deleting question" }, { status: 500 });
  }
}


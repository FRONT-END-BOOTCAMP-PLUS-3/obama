import { IsmalltalkOpenQuestionRepository } from "@/domain/repositories/smalltalk/ISmalltalkOpenQuestionRepository";
import { SmalltalkOpenQuestionDto } from "@/application/usecases/smalltalk/smalltalkOpenQuestion/dto/SmalltalkOpenQuestion";

export class OpenQuestionsUsecase {
  constructor(private readonly repository:  IsmalltalkOpenQuestionRepository) {}

  async execute(subjectId: number): Promise<SmalltalkOpenQuestionDto[]> {
    const questions = await this.repository.findBySubjectId(subjectId);

    const questionsDto = questions.map(question => ({
      openquestionId: question.openquestion_id, 
      subjectId: question.subject_id,         
      openQuestion: question.open_question    
    }));
    
    return questionsDto;
  }
}

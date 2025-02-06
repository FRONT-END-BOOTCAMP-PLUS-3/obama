import { IsmalltalkOpenQuestionRepository } from "@/domain/repositories/IsmalltalkOpenQuestionRepository";
import { SmalltalkOpenQuestionDto } from "@/application/smalltalk/smalltalkOpenQuestion/dto/SmalltalkOpenQuestion";

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

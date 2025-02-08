import { IBalancegameQuestionRepository } from "@/domain/repositories/smalltalk/IBalancegameQuestionRepository";
import { BalancegameQuestionDto } from "@/application/usecases/smalltalk/smalltalkBalancegame/dto/BalancegameQuestion";

export class BalancegameQuestionUsecase {
  constructor(private readonly repository: IBalancegameQuestionRepository){}
  async execute(subjectId: number): Promise<BalancegameQuestionDto[]> {
    const questions = await this.repository.findBySubjectId(subjectId);

    const questionsDto = questions.map(question => ({
      balancegamequestionId: question.balancegamequestion_id,
      subjectId: question.subject_id,
      balancegamequestionText: question.balancegamequestion_text
    }));

    return questionsDto;
  }
}
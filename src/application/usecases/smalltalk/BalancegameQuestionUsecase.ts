import { IBalancegameQuestionRepository } from "@/domain/repositories/smalltalk/IBalancegameQuestionRepository";
import { BalancegameQuestionDto } from "@/application/usecases/smalltalk/dto/BalancegameQuestion";

export class BalancegameQuestionUsecase {
  constructor(private readonly repository: IBalancegameQuestionRepository){}
  async execute(subjectId: number): Promise<BalancegameQuestionDto[]> {
    const questions = await this.repository.findBySubjectId(subjectId);

    return questions;
  }
}
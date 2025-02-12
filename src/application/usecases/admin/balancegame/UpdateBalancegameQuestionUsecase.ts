import { IBalancegameQuestionRepository } from "@/domain/repositories/smalltalk/IBalancegameQuestionRepository";

export class UpdateBalancegameQuestionUsecase {
  constructor(
    private readonly questionRepository: IBalancegameQuestionRepository
  ) {}

  public async execute(questionId: number, questionText: string): Promise<void> {
    if (!questionId || !questionText) {
      throw new Error("Invalid question update payload");
    }
    await this.questionRepository.updateQuestion(questionId, questionText);
  }
}

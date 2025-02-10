import { IOpenQuestionRepository } from "@/domain/repositories/smalltalk/IOpenQuestionRepository";

export class UpdateOpenQuestionUsecase {
  constructor(private readonly repository: IOpenQuestionRepository) {}

  async execute(questionId: number, updatedQuestion: string): Promise<void> {
    await this.repository.update(questionId, updatedQuestion);
  }
}

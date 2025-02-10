import { IOpenQuestionRepository } from "@/domain/repositories/smalltalk/IOpenQuestionRepository";

export class DeleteOpenQuestionUsecase {
  constructor(private readonly repository: IOpenQuestionRepository) {}

  async execute(questionId: number): Promise<void> {
    await this.repository.delete(questionId);
  }
}

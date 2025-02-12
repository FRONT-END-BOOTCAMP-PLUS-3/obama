import { IBalancegameAnswerRepository } from "@/domain/repositories/smalltalk/IBalancegameAnswerRepository";

export class UpdateBalancegameAnswerUsecase {
  constructor(
    private readonly answerRepository: IBalancegameAnswerRepository
  ) {}

  public async execute(
    answerId: number,
    answerTitle: string,
    answerText: string
  ): Promise<void> {
    if (!answerId || !answerTitle || !answerText) {
      throw new Error("Invalid answer update payload");
    }
    await this.answerRepository.updateAnswer(answerId, answerTitle, answerText);
  }
}

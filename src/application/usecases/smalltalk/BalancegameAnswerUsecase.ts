import { IBalancegameAnswerRepository } from "@/domain/repositories/smalltalk/IBalancegameAnswerRepository";
import { BalancegameAnswerDto } from "./dto/BalancegameAnswer";

export class BalancegameAnswerUsecase {
  constructor(private readonly repository: IBalancegameAnswerRepository){}
  async execute(questionId: number): Promise<BalancegameAnswerDto[]> {
    const answers = await this.repository.findAnswersByQuestionId(questionId);

    return answers;
  }
}
import { BalancegameAnswer } from "@/domain/entities/smalltalk/BalancegameAnwer";

export interface IBalancegameAnswerRepository {
  findAnswersByQuestionId(questionId: number): Promise<BalancegameAnswer[]>;
}

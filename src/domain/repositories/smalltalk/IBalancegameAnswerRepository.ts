import { BalancegameAnswer } from "@/domain/entities/smalltalk/BalancegameAnwer";


export interface IBalancegameAnswerRepository {
  findAnswersByQuestionId(questionId: number): Promise<BalancegameAnswer[]>;
  createBalancegameAnswer(
    balancegamequestionId: number,
    balancegameanswerTitle: string,
    balancegameanswerText: string
  ): Promise<BalancegameAnswer[]>;

  updateAnswer(
    answerId: number,
    answerTitle: string,
    answerText: string
  ): Promise<void>;


  deleteAnswersByQuestionId(questionId: number): Promise<void>; 
}

import { BalancegameQuestion } from "@/domain/entities/smalltalk/BalancegameQuestion";

export interface IBalancegameQuestionRepository {
  findBySubjectId(subjectId: number): Promise<BalancegameQuestion[]>;
  createBalancegameQuestion(
    subjectId: number,
    balancegamequestionText: string
  ): Promise<BalancegameQuestion[]>;

  updateQuestion(questionId: number, questionText: string): Promise<void>;
  deleteQuestion(questionId: number): Promise<void>;
}


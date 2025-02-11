import { BalancegameQuestion } from "@/domain/entities/smalltalk/BalancegameQuestion";

export interface IBalancegameQuestionRepository {
  findBySubjectId(subjectId: number): Promise<BalancegameQuestion[]>;
  createBalancegameQuestion(
    subjectId: number,
    balancegamequestionText: string
  ): Promise<BalancegameQuestion[]>;

  // 질문 업데이트 메서드 추가
  updateQuestion(questionId: number, questionText: string): Promise<void>;
}


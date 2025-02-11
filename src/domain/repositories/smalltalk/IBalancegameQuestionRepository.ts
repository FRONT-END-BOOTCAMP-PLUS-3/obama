import { BalancegameQuestion } from "@/domain/entities/smalltalk/BalancegameQuestion";

export interface IBalancegameQuestionRepository {
  // 이미 존재하는 메서드
  findBySubjectId(subjectId: number): Promise<BalancegameQuestion[]>;

  // 질문 생성 메서드 추가
  createBalancegameQuestion(
    subjectId: number,
    balancegamequestionText: string
  ): Promise<BalancegameQuestion[]>;
}

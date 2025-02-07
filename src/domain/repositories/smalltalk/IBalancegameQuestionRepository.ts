import { BalancegameQuestion } from "@/domain/entities/smalltalk/BalancegameQuestion";

export interface IBalancegameQuestionRepository {
  findBySubjectId(subjectId: number): Promise<BalancegameQuestion[]>;
}
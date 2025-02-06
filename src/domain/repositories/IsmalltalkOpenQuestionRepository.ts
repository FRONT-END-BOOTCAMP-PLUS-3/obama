import { SmalltalkOpenQuestion } from "@/domain/entities/SmalltalkOpenQuestion";

export interface IsmalltalkOpenQuestionRepository {
  findBySubjectId(subjectId: number): Promise<SmalltalkOpenQuestion[]>;
}
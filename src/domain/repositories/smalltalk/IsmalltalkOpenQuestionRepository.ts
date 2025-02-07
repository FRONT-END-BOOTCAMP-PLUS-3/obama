import { SmalltalkOpenQuestion } from "@/domain/entities/smalltalk/SmalltalkOpenQuestion";

export interface IsmalltalkOpenQuestionRepository {
  findBySubjectId(subjectId: number): Promise<SmalltalkOpenQuestion[]>;
}
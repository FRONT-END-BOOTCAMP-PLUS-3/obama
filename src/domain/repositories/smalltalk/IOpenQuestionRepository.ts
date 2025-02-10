import { OpenQuestion } from "@/domain/entities/smalltalk/OpenQuestion";

export interface IOpenQuestionRepository {
  findBySubjectId(subjectId: number): Promise<OpenQuestion[]>;
  findAll(): Promise<OpenQuestion[]>; 
}

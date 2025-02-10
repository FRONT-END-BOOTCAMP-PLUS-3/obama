import { OpenQuestion } from "@/domain/entities/smalltalk/OpenQuestion";

export interface IOpenQuestionRepository {
  findBySubjectId(subjectId: number): Promise<OpenQuestion[]>; 
  findAll(): Promise<OpenQuestion[]>;  
  create(question: { subjectId: number; openQuestion: string }): Promise<void>;  
  update(questionId: number, openQuestion: string): Promise<void>; 
  delete(questionId: number): Promise<void>;
}

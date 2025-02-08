import { IOpenQuestionRepository } from "@/domain/repositories/smalltalk/IOpenQuestionRepository";
import { OpenQuestionDto } from "@/application/usecases/smalltalk/smalltalkOpenQuestion/dto/OpenQuestion";

export class OpenQuestionsUsecase {
  constructor(private readonly repository: IOpenQuestionRepository) {}

  async execute(subjectId: number): Promise<OpenQuestionDto[]> {
    return await this.repository.findBySubjectId(subjectId); 
  }
}

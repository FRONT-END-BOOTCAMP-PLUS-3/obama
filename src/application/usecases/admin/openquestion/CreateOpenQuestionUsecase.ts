import { IOpenQuestionRepository } from "@/domain/repositories/smalltalk/IOpenQuestionRepository";
import { OpenQuestionDto } from "@/application/usecases/smalltalk/dto/OpenQuestion";

export class CreateOpenQuestionUsecase {
  constructor(private readonly repository: IOpenQuestionRepository) {}

  async execute(subjectId: number, openQuestion: string): Promise<OpenQuestionDto[]> {
    await this.repository.create({ subjectId, openQuestion });

    return await this.repository.findAll();
  }
}

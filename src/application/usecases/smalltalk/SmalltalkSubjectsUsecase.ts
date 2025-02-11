import { IsmalltalkSubjectRepository } from "@/domain/repositories/smalltalk/ISmalltalkSubjectRepository";
import { SmalltalkSubjectDto } from "@/application/usecases/smalltalk/dto/SmalltalkSubjectDto";

export class GetSmalltalkSubjectsUsecase {
  constructor(private readonly repository: IsmalltalkSubjectRepository) {}

  async execute(): Promise<SmalltalkSubjectDto[]> {
    const subjects = await this.repository.findAll();
    return subjects ?? [];
  }
}


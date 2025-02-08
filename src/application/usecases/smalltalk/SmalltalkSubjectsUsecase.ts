import { IsmalltalkSubjectRepository } from "@/domain/repositories/smalltalk/ISmalltalkSubjectRepository";
import { SmalltalkSubjectDto } from "@/application/usecases/smalltalk/dto/SmalltalkSubjectDto";

export class GetSmalltalkSubjectsUsecase {
  constructor(private readonly repository: IsmalltalkSubjectRepository) {}

  async execute(): Promise<SmalltalkSubjectDto[]> {
    return await this.repository.findAll(); 
  }
}


import { IsmalltalkSubjectRepository } from "@/domain/repositories/smalltalk/ISmalltalkSubjectRepository";
import { SmalltalkSubjectDto } from "@/application/usecases/smalltalk/smalltalkSubject/dto/SmalltalkSubjectDto";

export class GetSmalltalkSubjectsUsecase {
  constructor(private readonly repository: IsmalltalkSubjectRepository) {}

  async execute(): Promise<SmalltalkSubjectDto[]> {
    const subjects = await this.repository.findAll();

    const subjectDtos = subjects.map(subject => ({
      subjectId: subject.subject_id, 
      subjectName: subject.subject_name
    }));

    return subjectDtos;
  }
}


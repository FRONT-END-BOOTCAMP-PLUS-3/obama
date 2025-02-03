import { IsmalltalkSubjectRepository } from "@/domain/repositories/ISmalltalkSubjectRepository";
import { SmalltalkSubject } from "@/domain/entities/SmalltalkSubject";

export class SmalltalkSubjectService {
  constructor(private readonly repository: IsmalltalkSubjectRepository) {}

  async getSubjects(): Promise<SmalltalkSubject[]> {
    return this.repository.findAll();
  }

  async getSubjectById(id: number): Promise<SmalltalkSubject | null> {
    return this.repository.findById(id);
  }
}

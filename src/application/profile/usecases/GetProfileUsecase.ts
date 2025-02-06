import { IProfileRepository } from "@/domain/repositories/IProfileRepository";

export class GetProfileUsecase {
  private repository: IProfileRepository;

  constructor(repository: IProfileRepository) {
    this.repository = repository;
  }

  async execute(userId: string) {
    if (!userId) throw new Error("userId가 필요합니다.");
    return this.repository.getProfile(userId);
  }
}

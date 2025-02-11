import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";

export class GetProfileUsecase {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async execute(userId: string) {
    if (!userId) throw new Error("userId가 필요합니다.");
    return this.repository.findByEmail(userId);
  }
}

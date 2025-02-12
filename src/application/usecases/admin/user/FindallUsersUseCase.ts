import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";

export class FindAllUsersUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    const users = await this.userRepository.findAll();

    if (!users) {
      throw new Error("유저 데이터가 없습니다.");
    }

    return users;
  }
}

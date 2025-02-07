import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
export class DuplicateEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return user !== null;
  }
}

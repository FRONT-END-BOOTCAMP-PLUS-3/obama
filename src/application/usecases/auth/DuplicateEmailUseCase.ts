import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
export class DuplicateEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<boolean> {
    const user = await this.userRepository.findAuthDataByEmail(email);
    return user !== null;
  }
}

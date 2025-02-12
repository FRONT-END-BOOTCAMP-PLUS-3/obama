import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
export class FindEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(name: string, phone: string): Promise<string | null> {
    const email = await this.userRepository.findEmailByNameAndPhone(name, phone);
    if (!email) {
        throw new Error("NOT Found Email: " + name);
    }
    return email;
  }
}

import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IDuplicateEmailUseCase } from "@/application/auth/interfaces/IDuplicateEmailUseCase";
export class DuplicateEmailUseCase implements IDuplicateEmailUseCase  {

    constructor(private readonly userRepository: IUserRepository) {}

    async execute(email: string): Promise<boolean> {
        const user = await this.userRepository.findByEmail(email);
        return user !== null;
    }

}
import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class SignUpUseCase {
    constructor(private readonly userRepository : IUserRepository) {}

}
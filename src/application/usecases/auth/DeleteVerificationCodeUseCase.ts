import { RdVerificationRepository } from "@/infrastructure/repositories/auth/RdVerificationRepository";

export class DeleteVerificationCodeUseCase {
    constructor(private verificationRepository: RdVerificationRepository) {}

    async execute(email: string): Promise<void> {
        await this.verificationRepository.deleteVerificationCode(email);
    }
}
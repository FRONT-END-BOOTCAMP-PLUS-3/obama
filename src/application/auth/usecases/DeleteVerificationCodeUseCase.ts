import { RdVerificationRepository } from "@/infrastructure/repositories/auth/RdVerificationRepository";

export class DeleteVerificationCodeUseCase {
    constructor(private verificationRepository: RdVerificationRepository) {}

    async execute(email: string): Promise<void> {
        await this.verificationRepository.deleteVerificationCode(email);
        console.log("🗑 인증 코드 삭제 완료 (Redis)");
    }
}
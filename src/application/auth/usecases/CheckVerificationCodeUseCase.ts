import { RdVerificationRepository } from "@/infrastructure/repositories/auth/RdVerificationRepository";

export class CheckVerificationCodeUseCase {
    constructor(private verificationRepository : RdVerificationRepository) {}

    async execute(email: string, verificationCode: string): Promise<boolean> {
        const savedCode = await this.verificationRepository.getVerificationCode(email);
        console.log("saved Redisusecases")
        if(!savedCode) {
            throw new Error("인증코드가 만료되었거나 존재하지 않습니다.");
        }

        const isValid = savedCode === verificationCode;

        if(isValid) {
            await this.verificationRepository.deleteVerificationCode(email);
            console.log("delete RedisUsecase");
        }

        return isValid;
    }
}
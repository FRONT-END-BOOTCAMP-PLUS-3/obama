import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { IVerifyPasswordUseCase } from "./interfaces/IVerifyPasswordUseCase";
import { IPasswordVerificationUseCase } from "./interfaces/IPasswordVerificationUseCase";

export class VerifyPasswordUseCase implements IVerifyPasswordUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordVerificationUseCase: IPasswordVerificationUseCase
    ) {}

    async execute(userId: string, password: string): Promise<boolean> {
        console.log("🔐 VerifyPasswordUseCase 실행:", userId);

        // 1️⃣ 이메일을 기반으로 비밀번호 및 롤(Role) 가져오기
        const hashedPassword = await this.userRepository.findPasswordById(userId);

        if(!hashedPassword) {
            throw new Error("password가 존재하지 않습니다.")
            console.error();
        }
        // 2️⃣ 비밀번호 검증
        const isPasswordValid = await this.passwordVerificationUseCase.execute(password, hashedPassword);
       

        return isPasswordValid; // 인증 성공
    }
}
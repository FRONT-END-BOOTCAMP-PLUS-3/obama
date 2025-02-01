import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { SignUpRequestDTO } from "./dto/SignUpRequestDto";
import { v7 as uuidv7 } from "uuid";
import { User } from '@/domain/entities/User';
import { hashPassword } from "@/utils/auth/hashPassword";
export class SignUpUseCase {
    private SALT_ROUNDS = 10; 
    private readonly userRepository : IUserRepository;
    constructor(userRepository : IUserRepository) {
        this.userRepository = userRepository;
    }
    async execute(request: SignUpRequestDTO): Promise<void> {
        // ✅ UUID v7 생성
        const userId = uuidv7();

        // ✅ 비밀번호 해싱 유틸리티 사용
        const hashedPassword = await hashPassword(request.password, this.SALT_ROUNDS);

        // ✅ User 객체 생성
        const user: User = {
            userId,
            email: request.email,
            name: request.name,
            password: hashedPassword,
            birthDate: request.birthDate,
            phone: request.phone,
        };

        await this.userRepository.createUser(user);
    }
}
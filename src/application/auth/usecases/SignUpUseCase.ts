import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IDuplicateEmailUseCase } from "./interfaces/IDuplicateEmailUseCase";
import { IUUIDGenerator } from "@/application/common/interfaces/IUUIDGenerator";
import { IPasswordHasher } from "@/application/common/interfaces/IPasswordHasher";

import { SignUpRequestDTO } from "@/application/auth/dtos/SignUpRequestDto";
export class SignUpUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly duplicateEmailUseCase: IDuplicateEmailUseCase,
    private readonly uuidGenerator: IUUIDGenerator, // UUID 생성 유스케이스
    private readonly passwordHasher: IPasswordHasher
  ) {}
  async execute(request: SignUpRequestDTO): Promise<void> {
    const isDuplicate = await this.duplicateEmailUseCase.execute(request.email);
    if (isDuplicate) {
      throw new Error("이미 사용 중인 이메일입니다.");
    }

    // UUID 생성
    const userId = this.uuidGenerator.generate();

    // 비밀번호 해싱
    const hashedPassword = await this.passwordHasher.hash(request.password);

   await this.userRepository.createUser({
      userId,
      email: request.email,
      password: hashedPassword,
      name: request.name,
      birthDate: request.birthDate,
      phone: request.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  }
}

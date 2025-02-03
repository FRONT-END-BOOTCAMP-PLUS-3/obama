import { SignUpRequestDTO } from "@/application/auth/dtos/SignUpRequestDto";

import { IUUIDGeneratorUseCase } from "@/application/common/usecases/interfaces/IUUIDGeneratorUseCase";
import { IPasswordHasher } from "@/application/common/usecases/interfaces/IPasswordHasherUseCase";
import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class SignUpUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly uuidGenerator: IUUIDGeneratorUseCase, // UUID 생성 유스케이스
    private readonly passwordHasher: IPasswordHasher
  ) {}
  async execute(request: SignUpRequestDTO): Promise<void> {
    
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

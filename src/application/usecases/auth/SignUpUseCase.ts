import { SignUpRequestDTO } from "@/application/usecases/auth/dtos/SignUpRequestDto";

import { IUUIDGeneratorUseCase } from "@/application/usecases/auth/interfaces/IUUIDGeneratorUseCase";
import { IPasswordHasherUseCase } from "@/application/usecases/auth/interfaces/IPasswordHasherUseCase";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";

export class SignUpUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly uuidGenerator: IUUIDGeneratorUseCase, // UUID 생성 유스케이스
    private readonly passwordHasherUseCase: IPasswordHasherUseCase
  ) {}
  async execute(request: SignUpRequestDTO): Promise<void> {
    
    // UUID 생성
    const userId = this.uuidGenerator.generate();

    // 비밀번호 해싱
    const hashedPassword = await this.passwordHasherUseCase.execute(request.password);

   await this.userRepository.createUser({
      userId: userId,
      email: request.email,
      password: hashedPassword,
      name: request.name,
      birthDate: request.birthDate,
      phone: request.phone,
    });

  }
}

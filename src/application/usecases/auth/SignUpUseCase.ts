import { SignUpRequestDTO } from "@/application/usecases/auth/dtos/SignUpRequestDto";

import { IUUIDGeneratorUseCase } from "@/application/usecases/auth/interfaces/IUUIDGeneratorUseCase";
import { IPasswordHasher } from "@/application/usecases/auth/interfaces/IPasswordHasherUseCase";
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";

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
      user_id: userId,
      email: request.email,
      password: hashedPassword,
      name: request.name,
      birth_date: request.birthDate,
      phone: request.phone,
      created_at: new Date(),
      updated_at: new Date(),
    });

  }
}

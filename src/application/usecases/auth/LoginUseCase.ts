import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { LoginRequestDto } from "@/application/usecases/auth/dtos/LoginRequestDto";
import { ILoginUseCase } from "@/application/usecases/auth/interfaces/ILoginUseCase";
import { IPasswordHasherUseCase } from '@/application/usecases/auth/interfaces/IPasswordHasherUseCase';
import { UserResponseDto } from "@/application/usecases/auth/dtos/UserResponseDto";

export class LoginUseCase implements ILoginUseCase {
    constructor(
      private readonly userRepository: IUserRepository,
      private readonly passwordHasherUseCase: IPasswordHasherUseCase,
    ) {}
  
    async execute(request: LoginRequestDto): Promise<UserResponseDto> {
        
        const hashedPassword = await this.userRepository.findPasswordByEmail(request.email);

      if (!hashedPassword) {
        throw new Error("Invalid email or password");
      }
  
      // 3. 비밀번호 비교
      const isPasswordValid: boolean = await this.passwordHasherUseCase.compare(
        request.password,
        hashedPassword
      );
      
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }
      // 4. 비밀번호 검증 후 사용자 정보 조회
      const user = await this.userRepository.findByEmail(request.email);
      
      if (!user) {
        throw new Error("User not found after password verification");
      }

     const userResponseDto = {
        userId: user.userId,
        email: user.email,
        name: user.name,
        birthDate: user.birthDate,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
     }
      return userResponseDto as UserResponseDto;
    }
    
}
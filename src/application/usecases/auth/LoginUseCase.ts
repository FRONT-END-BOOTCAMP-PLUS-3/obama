import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { LoginRequestDto } from "@/application/usecases/auth/dtos/LoginRequestDto";
import { ILoginUseCase } from "@/application/usecases/auth/interfaces/ILoginUseCase";
import { IPasswordHasherUseCase } from '@/application/usecases/auth/interfaces/IPasswordHasherUseCase';
import { UserResponseDto } from "@/application/usecases/auth/dtos/UserResponseDto";
import { LoginError } from "@/application/usecases/auth/errors/LoginError";

export class LoginUseCase implements ILoginUseCase {
    constructor(
      private readonly userRepository: IUserRepository,
      private readonly passwordHasherUseCase: IPasswordHasherUseCase,
    ) {}
  
    async execute(request: LoginRequestDto): Promise<UserResponseDto> {

      if (!request.email || !request.password) {
        throw new LoginError("MISSING_CREDENTIALS","이메일과 비밀번호를 모두 입력해주세요.")
      }
        
      const userWithPassword  = await this.userRepository.findUserWithPasswordByEmail(request.email);

      if (!userWithPassword) {
        throw new LoginError("EMAIL_NOT_FOUND", "가입되지 않은 이메일입니다.");
      }

      const {password, user} =userWithPassword
  
      // 3. 비밀번호 비교
      const isValidPassword: boolean = await this.passwordHasherUseCase.compare(request.password, password);
      
      if (!isValidPassword) {
        throw new LoginError("INVALID_PASSWORD", "비밀번호가 올바르지 않습니다.");
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
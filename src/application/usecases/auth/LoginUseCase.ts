import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { LoginRequestDto } from "@/application/usecases/auth/dtos/LoginRequestDto";
import { IPasswordHasherUseCase } from '@/application/usecases/auth/interfaces/IPasswordHasherUseCase';
import { LoginError } from "@/application/usecases/auth/errors/LoginError";

export class LoginUseCase {
    constructor(
      private readonly userRepository: IUserRepository,
      private readonly passwordHasherUseCase: IPasswordHasherUseCase,
    ) {}
  
    async execute(request: LoginRequestDto): Promise<string> {

      if (!request.email || !request.password) {
        throw new LoginError("MISSING_CREDENTIALS","이메일과 비밀번호를 모두 입력해주세요.")
      }
        
      const userWithPassword  = await this.userRepository.findAuthDataByEmail(request.email);

      if (!userWithPassword) {
        throw new LoginError("EMAIL_NOT_FOUND", "가입되지 않은 이메일입니다.");
      }

      const { userId, password} =userWithPassword;
  
      // 3. 비밀번호 비교
      const isValidPassword: boolean = await this.passwordHasherUseCase.compare(request.password, password);
      
      if (!isValidPassword) {
        throw new LoginError("INVALID_PASSWORD", "비밀번호가 올바르지 않습니다.");
      }

      return userId;
    }
    
}
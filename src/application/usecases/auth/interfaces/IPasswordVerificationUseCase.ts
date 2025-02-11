export interface IPasswordVerificationUseCase {
    execute(password: string, hashed: string): Promise<boolean>;
  }
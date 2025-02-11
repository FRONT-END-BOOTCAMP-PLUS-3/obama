import { IPasswordHasherUseCase } from '@/application/usecases/auth/interfaces/IPasswordHasherUseCase';
import bcrypt from 'bcrypt';

export class PasswordHasherUseCase implements IPasswordHasherUseCase{
    private readonly saltRounds = 10;
  
    async execute(password: string): Promise<string> {
      return await bcrypt.hash(password, this.saltRounds);
    }
    

  }
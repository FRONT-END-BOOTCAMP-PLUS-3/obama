import { IPasswordHasherUseCase } from '@/application/usecases/auth/interfaces/IPasswordHasherUseCase';
import bcrypt from 'bcrypt';

export class PasswordHasherUseCase implements IPasswordHasherUseCase{
    private readonly saltRounds = 10;
  
    async hash(password: string): Promise<string> {
      return await bcrypt.hash(password, this.saltRounds);
    }
    
    async compare(password: string, hashed: string): Promise<boolean> {
      return await bcrypt.compare(password, hashed);
    }  

  }
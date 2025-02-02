import { IPasswordHasher } from '@/application/common/usecases/interfaces/IPasswordHasherUseCase';
import bcrypt from 'bcrypt';

export class PasswordHasherUseCase implements IPasswordHasher{
    private readonly saltRounds = 10;
  
    async hash(password: string): Promise<string> {
      return await bcrypt.hash(password, this.saltRounds);
    }
  }
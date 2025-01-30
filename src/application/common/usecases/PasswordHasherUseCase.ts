import bcrypt from 'bcrypt';
import { IPasswordHasher } from '@/application/common/interfaces/IPasswordHasher';

export class PasswordHasherUseCase implements IPasswordHasher {
    private readonly saltRounds = 10;
  
    async hash(password: string): Promise<string> {
      return await bcrypt.hash(password, this.saltRounds);
    }
  }
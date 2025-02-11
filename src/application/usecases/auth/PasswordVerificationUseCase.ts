import bcrypt from "bcrypt";
import { IPasswordVerificationUseCase } from "@/application/usecases/auth/interfaces/IPasswordVerificationUseCase";

export class PasswordVerificationUseCase implements IPasswordVerificationUseCase {
  async execute(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }
}

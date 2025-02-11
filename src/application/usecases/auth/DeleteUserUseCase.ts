
import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { IVerifyPasswordUseCase } from '@/application/usecases/auth/interfaces/IVerifyPasswordUseCase';

export class DeleteUserUseCase  {
    constructor(
        private readonly userRepository : IUserRepository,
        private readonly VerifyPasswordUseCase : IVerifyPasswordUseCase,

    ){}

    async execute(userId: string, password: string): Promise<boolean>{
        
        console.log("🔥 DeleteUserUseCase 실행:", userId);

        await this.VerifyPasswordUseCase.execute(userId, password);

       const deleteSuccess =  await this.userRepository.deleteById(userId);

       if(!deleteSuccess) {
        throw new Error("DELETE_FAILED")
       }

       return deleteSuccess;

    }

}
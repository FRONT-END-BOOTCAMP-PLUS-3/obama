import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";

export class DeleteUserByAdminUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(targetId: string):Promise<boolean> {

        // ✅ 관리자 권한 검증을 Adapter에서 처리 (UseCase에서는 제거)
        return await this.userRepository.deleteById(targetId);
     

    }
}
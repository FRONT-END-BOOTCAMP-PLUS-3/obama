import { IUserRepository } from "@/domain/repositories/auth/IUserRepository";
import { UserUpdateDto } from "@/application/usecases/auth/dtos/UserUpdateDto";

export class UpdateUserUseCase{
    constructor(
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(userUpdateDto: UserUpdateDto): Promise<boolean> {

        const {userId, field, newValue} = userUpdateDto;
       
        const isUpdate = await this.userRepository.updateUserField(userId, field, newValue);

        if(!isUpdate)throw new Error("update error");

        return isUpdate; // 인증 성공
    }
}
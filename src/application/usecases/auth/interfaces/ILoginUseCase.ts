import { LoginRequestDto } from "@/application/usecases/auth/dtos/LoginRequestDto";
import { UserResponseDto } from "@/application/usecases/auth/dtos/UserResponseDto";

export interface ILoginUseCase {
    execute(request: LoginRequestDto): Promise<UserResponseDto>;
}
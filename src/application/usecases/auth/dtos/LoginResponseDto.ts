import { UserRole } from "@/types/auth";

export interface LoginResponseDto {
    userId: string;
    role: UserRole;
}
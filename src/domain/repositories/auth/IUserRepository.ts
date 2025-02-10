import { User } from "@/domain/entities/user/User";
import { UserRole } from "@/types/auth";

export interface IUserRepository {
    createUser (user: User): Promise<void>;
    // 지워야할 것이지만 conflict 때문에 냄겨둠
    findByEmail (email: string): Promise<User | null>;
    findUserById(userId: string): Promise<{password: string; user: Omit<User, "password"> } | null>;
    findAuthDataByEmail(email: string): Promise<{ userId: string; password: string; role:UserRole;} | null>;
}
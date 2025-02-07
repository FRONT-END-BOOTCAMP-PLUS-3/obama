import { User } from "@/domain/entities/user/User";

export interface IUserRepository {
    createUser (user: User): Promise<void>;
    findByEmail (email: string): Promise<User | null>;
    findPasswordByEmail(email: string): Promise<string | null>;
}
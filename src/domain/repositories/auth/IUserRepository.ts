import { UserIdRequestDto } from "@/application/usecases/auth/dtos/userIdRequestDto";
import { User } from "@/domain/entities/user/User";
import { UserRole } from "@/types/auth";

export interface IUserRepository {
    // create
    createUser (user: User): Promise<void>;
    
    //read
    findPasswordById(userId: string): Promise<string | null>;
    findAll(): Promise<Omit<User, "password">[] | null>;
    findUserById(userId: string): Promise<{password: string; user: Omit<User, "password"> } | null>;
    findAuthDataByEmail(email: string): Promise<{ userId: string; password: string; role: UserRole } | null> ;
    findEmailByNameAndPhone(email:string, phone:string): Promise<string | null>;
    findIdByNameAndPhoneAndEmailAndBirthDate(request:UserIdRequestDto): Promise<string | null>;

    //update
    updateUserField(userId: string, field: string, newValue: string): Promise<boolean>;

    //delete
    deleteById(userId: string): Promise<boolean>;
}
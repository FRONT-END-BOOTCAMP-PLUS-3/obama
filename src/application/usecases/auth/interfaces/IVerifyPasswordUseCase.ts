export interface IVerifyPasswordUseCase {
    execute(userId: string, password: string): Promise<boolean>;
}

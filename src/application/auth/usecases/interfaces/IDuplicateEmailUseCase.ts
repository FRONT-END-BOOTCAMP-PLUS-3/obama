export interface IDuplicateEmailUseCase {
    execute(email: string): Promise<boolean>;
}
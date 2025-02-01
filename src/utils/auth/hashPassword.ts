import bcrypt from "bcrypt";

/**
 * 비밀번호를 해싱하는 함수
 * @param password 원본 비밀번호
 * @param saltRounds 솔트 라운드 값
 * @returns 해싱된 비밀번호
 */
export async function hashPassword(password: string, saltRounds: number): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
}
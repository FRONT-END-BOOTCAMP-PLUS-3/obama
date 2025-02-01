import bcrypt from "bcrypt";
import { SignUpRequestDTO } from "@/application/usecases/auth/dto/SignUpRequestDto";
import { SignUpUseCase } from "@/application/usecases/auth/SignUpUseCase";
import { User } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { v7 as uuidv7 } from "uuid";

// ✅ Jest에서 uuid 모듈을 Mock 처리 (ESM 방식)
jest.mock("uuid", () => ({
    v7: jest.fn(() => "mocked-uuid-v7"), // ✅ 항상 "mocked-uuid-v7"을 반환
}));

// ✅ Jest Mock을 사용하여 Repository를 가짜 객체로 만듦
const mockUserRepository: jest.Mocked<IUserRepository> = {
    createUser: jest.fn(),
};

describe("SignUpUseCase", () => {
    let signUpUseCase: SignUpUseCase;

    beforeEach(() => {
        signUpUseCase = new SignUpUseCase(mockUserRepository);
        jest.clearAllMocks(); // ✅ 각 테스트 실행 전 mock을 초기화
    });

    it("✅ 회원가입 시 UUID v7이 생성되고, 비밀번호가 해싱된 후 저장되어야 한다.", async () => {
        const mockRequest: SignUpRequestDTO = {
            email: "test@example.com",
            name: "Test User",
            password: "securepassword",
            birthDate: "1990-01-01",
            phone: "01012345678",
        };

        // ✅ UUID v7을 명확하게 Mock 적용
        (uuidv7 as jest.Mock).mockReturnValue("mocked-uuid-v7");

        // ✅ bcrypt.hash를 Mock 처리하여 특정 값을 반환하도록 설정 (ESM 방식)
        jest.spyOn(bcrypt, "hash").mockImplementation(async () => "hashed-password");

        await signUpUseCase.execute(mockRequest);

        // ✅ 저장될 데이터 확인
        const expectedUser: User = {
            userId: "mocked-uuid-v7", // ✅ Mock이 적용된 UUID
            email: mockRequest.email,
            name: mockRequest.name,
            password: "hashed-password", // ✅ 해싱된 비밀번호
            birthDate: mockRequest.birthDate,
            phone: mockRequest.phone,
        };

        // ✅ createUser가 정상적으로 호출되었는지 검증
        expect(mockUserRepository.createUser).toHaveBeenCalledTimes(1);
        expect(mockUserRepository.createUser).toHaveBeenCalledWith(expectedUser);
    });
});

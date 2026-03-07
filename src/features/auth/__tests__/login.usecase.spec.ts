import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginUseCase } from '../application/use-cases/login.usecase';
import { AuthRepository } from '../domain/auth.repository';
import { InvalidCredentialsError, NetworkError } from '../domain/errors/auth.error';

describe('LoginUseCase', () => {
    let useCase: LoginUseCase;
    let mockRepository: ReturnType<typeof vi.mocked<AuthRepository>>;

    beforeEach(() => {
        mockRepository = {
            login: vi.fn(),
        };
        useCase = new LoginUseCase(mockRepository);
    });

    it('이메일과 비밀번호가 올바르면 유즈케이스가 에러 없이 성공(resolve)해야 한다.', async () => {
        mockRepository.login.mockResolvedValueOnce();

        await expect(useCase.execute({ email: 'test@test.com', password: 'password123' })).resolves.toBeUndefined();
        expect(mockRepository.login).toHaveBeenCalledWith('test@test.com', 'password123');
    });

    it('자격증명이 유효하지 않으면 InvalidCredentialsError를 던져야 한다.', async () => {
        mockRepository.login.mockRejectedValueOnce(new InvalidCredentialsError());

        await expect(useCase.execute({ email: 'wrong@test.com', password: 'wrong' }))
            .rejects
            .toThrow(InvalidCredentialsError);
    });

    it('인터넷 연결 문제 등 서버 에러 시 NetworkError를 던져야 한다.', async () => {
        mockRepository.login.mockRejectedValueOnce(new NetworkError());

        await expect(useCase.execute({ email: 'test@test.com', password: 'password123' }))
            .rejects
            .toThrow(NetworkError);
    });
});

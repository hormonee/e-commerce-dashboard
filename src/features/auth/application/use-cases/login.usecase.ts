import { AuthRepository } from "../../domain/auth.repository";
import { LoginRequest } from "../dtos/login.dto";

export class LoginUseCase {
    constructor(private readonly authRepository: AuthRepository) { }

    async execute(dto: LoginRequest): Promise<void> {
        // Repository에서 이미 도메인 에러(InvalidCredentialsError, NetworkError 등)로 
        // 매핑하여 던지도록 설계되어 있으므로 그대로 호출만 합니다.
        await this.authRepository.login(dto.email, dto.password);
    }
}

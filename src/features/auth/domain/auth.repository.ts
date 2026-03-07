export interface AuthRepository {
    /**
     * 이메일과 비밀번호를 사용하여 로그인합니다.
     * 인증 실패 시 InvalidCredentialsError를 던지고,
     * 네트워크 에러나 기타 서버 에러 시 NetworkError를 던집니다.
     * 
     * @param email 사용자 이메일
     * @param password 사용자 비밀번호
     */
    login(email: string, password: string): Promise<void>;

    /**
     * 현재 세션을 로그아웃합니다.
     */
    logout(): Promise<void>;
}

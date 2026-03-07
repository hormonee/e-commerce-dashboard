export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthError";
    }
}

export class InvalidCredentialsError extends AuthError {
    constructor() {
        super("이메일 또는 비밀번호가 올바르지 않습니다");
        this.name = "InvalidCredentialsError";
    }
}

export class NetworkError extends AuthError {
    constructor() {
        super("서버에 연결할 수 없습니다. 다시 시도해주세요");
        this.name = "NetworkError";
    }
}

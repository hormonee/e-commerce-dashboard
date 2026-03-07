import { AuthRepository } from "../domain/auth.repository";
import { InvalidCredentialsError, NetworkError } from "../domain/errors/auth.error";
import { createClient } from "../../../shared/api/supabase/server";

export class SupabaseAuthRepository implements AuthRepository {
    async login(email: string, password: string): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            if (
                error.message.includes("Invalid login credentials") ||
                error.status === 400
            ) {
                throw new InvalidCredentialsError();
            }

            // 그 외의 경우는 대부분 네트워크나 서버의 500 에러 등으로 간주
            throw new NetworkError();
        }
    }

    async logout(): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw new NetworkError();
        }
    }
}

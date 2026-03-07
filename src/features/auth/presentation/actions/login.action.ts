"use server";

import { redirect } from "next/navigation";
import { AuthError } from "@/src/features/auth/domain/errors/auth.error";
import { SupabaseAuthRepository } from "@/src/features/auth/infrastructure/supabase-auth.repository";
import { LoginUseCase } from "@/src/features/auth/application/use-cases/login.usecase";
import { loginSchema } from "@/src/features/auth/application/dtos/login.dto";

export async function loginAction(_prevState: { error: string } | null, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const parseResult = loginSchema.safeParse({ email, password });
    if (!parseResult.success) {
        return {
            error: parseResult.error.issues[0]?.message ?? "입력 형식이 올바르지 않습니다.",
            email
        };
    }

    // DI(의존성 주입) 구성 (서버 환경)
    const repository = new SupabaseAuthRepository();
    const useCase = new LoginUseCase(repository);

    try {
        await useCase.execute(parseResult.data);
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.message, email };
        }
        return { error: "알 수 없는 에러가 발생했습니다.", email };
    }

    // 로그인 성공 시 리다이렉션 (try-catch 밖에서 실행해야 Next.js redirect가 정상 동작)
    redirect("/");
}

"use server";

import { redirect } from "next/navigation";
import { SupabaseAuthRepository } from "@/src/features/auth/infrastructure/supabase-auth.repository";
import { LogoutUseCase } from "@/src/features/auth/application/use-cases/logout.usecase";

export async function logoutAction() {
    const repository = new SupabaseAuthRepository();
    const useCase = new LogoutUseCase(repository);

    await useCase.execute();

    redirect("/login");
}

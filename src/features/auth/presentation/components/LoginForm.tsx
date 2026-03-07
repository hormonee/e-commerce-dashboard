"use client";

"use client";

import { useActionState, useEffect, useRef } from "react";
import { loginAction } from "@/src/features/auth/presentation/actions/login.action";
import { Input } from "@/src/shared/ui/input";
import { Button } from "@/src/shared/ui/button";

const initialState = {
    error: "",
    email: "",
};

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginAction, initialState);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (state?.error) {
            passwordRef.current?.focus();
        }
    }, [state?.error]);

    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">관리자 로그인</h1>
                <p className="text-gray-500 text-sm">대시보드 접속을 위해 로그인해주세요.</p>
            </div>

            <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">이메일</label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="admin@example.com"
                        required
                        autoComplete="email"
                        defaultValue={state?.email}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">비밀번호</label>
                    </div>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        required
                        autoComplete="current-password"
                        ref={passwordRef}
                    />
                </div>

                {state?.error && (
                    <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-md">
                        {state.error}
                    </div>
                )}

                <Button type="submit" className="w-full h-12 text-base font-semibold transition-transform active:scale-[0.98]" disabled={isPending}>
                    {isPending ? "로그인 중..." : "로그인"}
                </Button>
            </form>
        </div>
    );
}

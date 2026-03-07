import { LoginForm } from "@/src/features/auth/presentation/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "관리자 로그인 - E-Commerce Dashboard",
    description: "관리자 대시보드 로그인 페이지",
};

export default function LoginPage() {
    return <LoginForm />;
}

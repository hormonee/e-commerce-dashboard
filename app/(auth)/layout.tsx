import { Header } from "@/src/shared/ui/layout/Header";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
            <Header isPublic={true} />
            <main className="flex-1 flex items-center justify-center p-8">
                {children}
            </main>
        </div>
    );
}

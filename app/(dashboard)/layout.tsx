import { Sidebar } from "@/src/shared/ui/layout/Sidebar";
import { Header } from "@/src/shared/ui/layout/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-[260px] min-h-screen flex flex-col overflow-x-hidden">
                <Header />
                <div className="flex justify-center flex-1">
                    <main className="w-full max-w-[1280px] min-h-screen px-8 py-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

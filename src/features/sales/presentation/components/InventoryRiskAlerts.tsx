import { InventoryRisk } from "../../domain/entities/sales.entity";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui/card";
import { AlertTriangle, Hourglass } from "lucide-react";

interface InventoryRiskAlertsProps {
    risks: InventoryRisk[];
}

export function InventoryRiskAlerts({ risks }: InventoryRiskAlertsProps) {
    const getRiskIcon = (issue: InventoryRisk['issue']) => {
        if (issue === 'low_stock') {
            return <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />;
        }
        return <Hourglass className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />;
    };

    const getRiskBg = (issue: InventoryRisk['issue']) => {
        if (issue === 'low_stock') return "bg-rose-50 border-rose-100";
        return "bg-amber-50 border-amber-100";
    };

    return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-[#0F172A] font-bold mb-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                실시간 재고 리스크 알림
            </h3>
            <div className="space-y-4">
                {risks.map((risk) => (
                    <div key={risk.id} className={`flex gap-4 p-5 rounded-2xl border transition-all hover:shadow-md hover:shadow-slate-50 ${getRiskBg(risk.issue)}`}>
                        <div className="bg-white p-2 rounded-xl shadow-sm h-fit">
                            {getRiskIcon(risk.issue)}
                        </div>
                        <div>
                            <p className="font-extrabold text-[#0F172A] text-sm tracking-tight">{risk.productName}</p>
                            <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">{risk.details}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

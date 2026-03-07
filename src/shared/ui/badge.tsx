import * as React from "react"
import { cn } from "@/src/shared/lib/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'success' | 'destructive' | 'outline' | 'warning'
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "border-transparent bg-slate-800 text-slate-100",
        success: "border-transparent bg-emerald-500/10 text-emerald-500",
        destructive: "border-transparent bg-red-500/10 text-red-500",
        warning: "border-transparent bg-amber-500/10 text-amber-500",
        outline: "text-slate-100 border-slate-700"
    }

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    )
}

export { Badge }

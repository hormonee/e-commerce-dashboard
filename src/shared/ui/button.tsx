import * as React from "react"
import { cn } from "@/src/shared/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost' | 'danger'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', ...props }, ref) => {
        const variants = {
            primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200",
            outline: "bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50",
            ghost: "bg-transparent text-slate-500 hover:bg-slate-50",
            danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200"
        }

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-3 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 transition-all active:scale-[0.98]",
                    variants[variant],
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }

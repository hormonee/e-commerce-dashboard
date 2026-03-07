import * as React from "react"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
    ({ className, checked, onCheckedChange, ...props }, ref) => {
        return (
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-200'} ${className || ''}`}>
                <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    onChange={(e) => onCheckedChange?.(e.target.checked)}
                    ref={ref}
                    {...props}
                />
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </div>
        )
    }
)
Switch.displayName = "Switch"

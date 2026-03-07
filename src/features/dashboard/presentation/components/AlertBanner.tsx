import React from 'react';
import { AlertCircle, MessageSquare } from 'lucide-react';

interface AlertBannerProps {
    type: 'warning' | 'info';
    title: string;
    description: string;
    actionText: string;
    onActionClick?: () => void;
}

export function AlertBanner({ type, title, description, actionText, onActionClick }: AlertBannerProps) {
    const isWarning = type === 'warning';

    return (
        <div className={`border rounded-3xl p-6 flex items-center justify-between gap-6 shadow-sm transition-all duration-300 ${isWarning
                ? 'bg-rose-50/50 border-rose-100 hover:bg-rose-50'
                : 'bg-blue-50/50 border-blue-100 hover:bg-blue-50'
            }`}>
            <div className="flex items-start gap-5">
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${isWarning ? 'bg-rose-500 text-white' : 'bg-blue-600 text-white'
                    }`}>
                    {isWarning ? (
                        <AlertCircle className="w-5 h-5" />
                    ) : (
                        <MessageSquare className="w-5 h-5" />
                    )}
                </div>
                <div>
                    <h4 className={`text-sm font-extrabold tracking-tight ${isWarning ? 'text-rose-600' : 'text-blue-700'}`}>
                        {title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
            <button
                onClick={onActionClick}
                className={`text-xs font-extrabold whitespace-nowrap px-5 py-2.5 rounded-xl transition-all shadow-sm ${isWarning
                        ? 'bg-white text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white'
                        : 'bg-white text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white'
                    }`}
            >
                {actionText}
            </button>
        </div>
    );
}

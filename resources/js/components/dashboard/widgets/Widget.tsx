import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface IWidgetProps {
    title: string;
    value: string;
    wicon: React.ComponentType<{ size?: number; className?: string }>;
    trend: string;
    up: boolean;
    iconBg: string;
    iconColor: string;
}

export const Widget = ({ title, value, wicon: Icon, trend, up, iconBg, iconColor }: IWidgetProps) => {
    return (
        <div className="bg-white rounded-xl border border-stone-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                    <Icon size={18} className={iconColor} />
                </div>
                {up ? (
                    <TrendingUp size={14} className="text-emerald-500 mt-1" />
                ) : (
                    <TrendingDown size={14} className="text-red-400 mt-1" />
                )}
            </div>
            <p className="text-stone-500 text-xs font-medium leading-tight">{title}</p>
            <p className="text-stone-900 text-xl font-bold mt-1">{value}</p>
            <p className={`text-xs mt-1 ${up ? "text-emerald-600" : "text-red-400"}`}>{trend}</p>
        </div>
    );
};

import { ClipboardList } from 'lucide-react';
import React from 'react'

export const EmptyState = ({ message }: { message: string }) => (
    <div className="py-10 flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
            <ClipboardList size={18} className="text-stone-300" />
        </div>
        <p className="text-stone-400 text-sm">{message}</p>
    </div>
);

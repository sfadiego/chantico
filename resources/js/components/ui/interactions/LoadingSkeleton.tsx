import React from 'react'

export const LoadingSkeleton = () => (
    <div className="flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-stone-50 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-stone-200 shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 bg-stone-200 rounded w-2/5" />
                    <div className="h-2.5 bg-stone-200 rounded w-1/4" />
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="h-3 bg-stone-200 rounded w-14" />
                    <div className="h-4 bg-stone-200 rounded-full w-16" />
                </div>
            </div>
        ))}
    </div>
);


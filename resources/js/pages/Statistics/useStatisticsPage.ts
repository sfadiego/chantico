import { useState } from "react";
import { useBestSeller } from "@/services/useStatisticsService";

const currentMonth = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
};

const formatMonth = (month: string) =>
    new Date(`${month}-15T12:00:00`).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
    });

export const useStatisticsPage = () => {
    const [month, setMonth] = useState<string>(currentMonth());

    const { data: bestSellers = [], isLoading } = useBestSeller(month);

    return {
        month,
        formattedMonth: formatMonth(month),
        bestSellers,
        isLoading,
        handleMonthChange: (value: string) => setMonth(value),
    };
};

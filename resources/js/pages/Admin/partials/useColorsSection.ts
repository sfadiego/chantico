import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUpdateBusinessConfig } from "@/services/useBusinessConfigService";
import { IBusinessConfig } from "@/models/IBusinessConfig";

export const useColorsSection = (config: IBusinessConfig | undefined) => {
    const { mutate: update, isPending: saving } = useUpdateBusinessConfig();

    const [businessName, setBusinessName] = useState("");
    const [primaryColor, setPrimaryColor] = useState("#f59e0b");
    const [sidebarColor, setSidebarColor] = useState("#1c1917");
    const [fontColor, setFontColor] = useState("#1c1917");
    const [labelColor, setLabelColor] = useState("#1c1917");

    useEffect(() => {
        if (!config) return;
        setBusinessName(config.business_name);
        setPrimaryColor(config.primary_color);
        setSidebarColor(config.sidebar_color);
        setFontColor(config.font_color);
        setLabelColor(config.label_color);
    }, [config]);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--color-primary", primaryColor);
        root.style.setProperty("--color-sidebar", sidebarColor);
        root.style.setProperty("--color-font", fontColor);
        root.style.setProperty("--color-label", labelColor);
    }, [primaryColor, sidebarColor, fontColor, labelColor]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        update(
            {
                business_name: businessName,
                primary_color: primaryColor,
                sidebar_color: sidebarColor,
                font_color: fontColor,
                label_color: labelColor,
            },
            {
                onSuccess: () => toast.success("Configuración guardada"),
                onError: () => toast.error("Error al guardar"),
            },
        );
    };

    return {
        businessName, setBusinessName,
        primaryColor, setPrimaryColor,
        sidebarColor, setSidebarColor,
        fontColor, setFontColor,
        labelColor, setLabelColor,
        saving,
        handleSubmit,
    };
};

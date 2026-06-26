import { toast } from "react-toastify";
import { useGetAppSettings, useUpdateAppSettings } from "@/services/useAppSettingService";

export const useSettingsPage = () => {
    const { data: settings, isLoading } = useGetAppSettings();
    const { mutate: update, isPending: saving } = useUpdateAppSettings();

    const toggleLogoUpload = () => {
        update(
            { logo_upload_enabled: !settings?.logo_upload_enabled },
            {
                onSuccess: () => toast.success("Configuración guardada"),
                onError: () => toast.error("Error al guardar"),
            }
        );
    };

    return { settings, isLoading, saving, toggleLogoUpload };
};

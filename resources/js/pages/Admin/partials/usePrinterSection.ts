import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { IBusinessConfig } from "@/models/IBusinessConfig";
import { useUpdateBusinessConfig } from "@/services/useBusinessConfigService";

const schema = Yup.object({
    printer_name: Yup.string().nullable().max(100),
    printer_host: Yup.string().nullable().max(100),
});

export const usePrinterSection = (config: IBusinessConfig | undefined) => {
    const updateMutation = useUpdateBusinessConfig();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            printer_name: config?.printer_name ?? "",
            printer_host: config?.printer_host ?? "",
        },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting }) => {
            if (!config) return;
            try {
                const { id, slug, logo_path, created_at, updated_at, ...updatableConfig } = config;

                await updateMutation.mutateAsync({
                    ...updatableConfig,
                    printer_name: values.printer_name || null,
                    printer_host: values.printer_host || null,
                });
                toast.success("Configuración de impresora guardada.");
            } catch {
                toast.error("No se pudo guardar la configuración.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return { formik };
};

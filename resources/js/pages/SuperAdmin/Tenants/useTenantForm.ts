import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateTenant, useUpdateTenant, useListTenants } from "@/services/useSuperAdminService";
import { SuperAdminRoutes } from "@/enums/RoutesEnum";

const baseSchema = {
    slug:          Yup.string().required("Requerido").matches(/^[a-z0-9-]+$/, "Solo letras, números y guiones"),
    business_name: Yup.string().required("Requerido"),
    primary_color: Yup.string().required("Requerido"),
    sidebar_color: Yup.string().required("Requerido"),
    font_color:    Yup.string().required("Requerido"),
    label_color:   Yup.string().required("Requerido"),
};

const createSchema = Yup.object({
    ...baseSchema,
    admin_nombre:   Yup.string().required("Requerido"),
    admin_apellido: Yup.string().required("Requerido"),
    admin_email:    Yup.string().email("Email inválido").required("Requerido"),
    admin_usuario:  Yup.string().required("Requerido"),
    admin_password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
});

const editSchema = Yup.object(baseSchema);

export const useTenantForm = (tenantId?: number) => {
    const navigate = useNavigate();
    const isEdit = !!tenantId;

    const { data: tenants = [] } = useListTenants();
    const tenant = tenants.find((t) => t.id === tenantId);

    const createMutation = useCreateTenant();
    const updateMutation = useUpdateTenant();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            slug:           tenant?.slug ?? "",
            business_name:  tenant?.business_name ?? "",
            primary_color:  tenant?.primary_color ?? "#6366f1",
            sidebar_color:  tenant?.sidebar_color ?? "#1e293b",
            font_color:     tenant?.font_color ?? "#ffffff",
            label_color:    tenant?.label_color ?? "#1e293b",
            admin_nombre:   "",
            admin_apellido: "",
            admin_email:    "",
            admin_usuario:  "",
            admin_password: "",
        },
        validationSchema: isEdit ? editSchema : createSchema,
        onSubmit: async (values, helpers) => {
            try {
                if (isEdit) {
                    await updateMutation.mutateAsync({ id: tenantId, data: values });
                    toast.success("Cliente actualizado.");
                } else {
                    await createMutation.mutateAsync(values as any);
                    toast.success("Cliente creado correctamente.");
                }
                navigate(SuperAdminRoutes.Tenants);
            } catch (err: any) {
                const msg = err?.response?.data?.message ?? "Error al guardar.";
                toast.error(msg);
                helpers.setSubmitting(false);
            }
        },
    });

    return { formik, isEdit, tenant };
};

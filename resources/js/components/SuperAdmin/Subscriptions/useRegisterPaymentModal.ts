import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { SubscriptionPlanEnum } from "@/enums/SubscriptionPlanEnum";
import { ITenantWithSubscription } from "@/models/ISubscription";
import { useRegisterPayment } from "@/services/useSubscriptionService";

const schema = Yup.object({
    plan:      Yup.string().oneOf(Object.values(SubscriptionPlanEnum)).required("Requerido"),
    starts_at: Yup.string().required("Requerido"),
    amount:    Yup.number().nullable().min(0),
    notes:     Yup.string().nullable().max(300),
});

export const useRegisterPaymentModal = (tenant: ITenantWithSubscription | null, onClose: () => void) => {
    const { mutateAsync } = useRegisterPayment();

    const today = new Date().toISOString().split("T")[0];

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            plan:      SubscriptionPlanEnum.Monthly,
            starts_at: today,
            amount:    "" as unknown as number,
            notes:     "",
        },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            if (!tenant) return;
            try {
                await mutateAsync({
                    tenantId: tenant.id,
                    data: {
                        plan:      values.plan as SubscriptionPlanEnum,
                        starts_at: values.starts_at,
                        amount:    values.amount || null,
                        notes:     values.notes || null,
                    },
                });
                toast.success("Pago registrado correctamente.");
                resetForm();
                onClose();
            } catch {
                toast.error("No se pudo registrar el pago.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return { formik };
};

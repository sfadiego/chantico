import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ICategory } from "@/models/ICategory";
import { useUpdateCategory } from "@/services/useCategoriesService";
import { CategoryForm } from "./useAddCategoryModal";

const schema = Yup.object({
    nombre: Yup.string().trim().required("El nombre es requerido"),
    orden: Yup.number().typeError("Debe ser un número").min(0).nullable(),
    icon_name: Yup.string(),
});

export const useEditCategoryModal = (
    category: ICategory | null,
    onSuccess: () => void,
    onClose: () => void,
) => {
    const { mutateAsync: updateCategory } = useUpdateCategory(category?.id ?? 0);

    const formik = useFormik<CategoryForm>({
        enableReinitialize: true,
        initialValues: {
            nombre: category?.nombre ?? "",
            orden: category?.orden?.toString() ?? "",
            icon_name: category?.icon_name ?? "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                await updateCategory({
                    nombre: values.nombre.trim(),
                    ...(values.orden !== "" ? { orden: Number(values.orden) } : {}),
                    icon_name: values.icon_name.trim(),
                });
                toast.success("Categoría actualizada");
                onSuccess();
                onClose();
            } catch {
                toast.error("Error al actualizar la categoría");
            }
        },
    });

    return { formik };
};

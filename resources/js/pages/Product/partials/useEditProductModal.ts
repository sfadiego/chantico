import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useIndexCategories } from "@/services/useCategoriesService";
import { useUpdateProduct } from "@/services/useProductService";
import { IProduct } from "@/models/IProduct";
import { ProductForm } from "./useAddProductModal";

const schema = Yup.object({
    nombre: Yup.string().trim().required("El nombre es requerido"),
    descripcion: Yup.string(),
    precio: Yup.number()
        .typeError("Ingresa un precio válido")
        .positive("El precio debe ser mayor a 0")
        .required("El precio es requerido"),
    categoria_id: Yup.string().required("La categoría es requerida"),
    activo: Yup.boolean(),
});

export const useEditProductModal = (
    product: IProduct | null,
    onSuccess: () => void,
    onClose: () => void,
) => {
    const { mutateAsync: updateProduct } = useUpdateProduct(product?.id ?? 0);
    const { data: categories } = useIndexCategories();

    const formik = useFormik<ProductForm>({
        enableReinitialize: true,
        initialValues: {
            nombre: product?.nombre ?? "",
            descripcion: product?.descripcion ?? "",
            precio: product?.precio?.toString() ?? "",
            categoria_id: product?.categoria_id?.toString() ?? "",
            activo: product?.activo ?? true,
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                await updateProduct({
                    nombre: values.nombre.trim(),
                    descripcion: values.descripcion.trim(),
                    precio: Number(values.precio),
                    categoria_id: Number(values.categoria_id),
                    activo: values.activo,
                });
                toast.success("Producto actualizado");
                onSuccess();
                onClose();
            } catch {
                toast.error("Error al actualizar el producto");
            }
        },
    });

    return {
        formik,
        categories: categories ?? [],
    };
};

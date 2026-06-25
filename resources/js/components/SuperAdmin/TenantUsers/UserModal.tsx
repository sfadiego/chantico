import { X, Loader } from "lucide-react";
import { IUser } from "@/models/IUser";
import { RoleEnum } from "@/enums/RoleEnum";
import { useUserModal } from "./useUserModal";

interface UserModalProps {
    tenantId: number;
    user: IUser | null;
    onClose: () => void;
}

export const UserModal = ({ tenantId, user, onClose }: UserModalProps) => {
    const { formik, isEdit } = useUserModal({ tenantId, user, onClose });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-base font-semibold text-slate-900">
                        {isEdit ? "Editar usuario" : "Nuevo usuario"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={formik.handleSubmit} className="px-6 py-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field formik={formik} name="nombre" label="Nombre" />
                        <Field formik={formik} name="apellido_paterno" label="Apellido paterno" />
                        <Field formik={formik} name="apellido_materno" label="Apellido materno" />
                        <Field formik={formik} name="email" label="Correo electrónico" type="email" />
                        <Field formik={formik} name="usuario" label="Usuario" />
                        <Field
                            formik={formik}
                            name="password"
                            label={isEdit ? "Contraseña (dejar vacío para no cambiar)" : "Contraseña"}
                            type="password"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Rol</label>
                            <select
                                name="rol_id"
                                value={formik.values.rol_id}
                                onChange={formik.handleChange}
                                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value={RoleEnum.Admin}>Administrador</option>
                                <option value={RoleEnum.Employe}>Empleado</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3 pt-6">
                            <button
                                type="button"
                                onClick={() => formik.setFieldValue("activo", !formik.values.activo)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    formik.values.activo ? "bg-indigo-600" : "bg-slate-200"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                                        formik.values.activo ? "translate-x-6" : "translate-x-1"
                                    }`}
                                />
                            </button>
                            <span className="text-sm text-slate-600">
                                {formik.values.activo ? "Activo" : "Inactivo"}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-medium transition-colors"
                        >
                            {formik.isSubmitting && <Loader size={14} className="animate-spin" />}
                            {isEdit ? "Guardar cambios" : "Crear usuario"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

interface FieldProps {
    formik: ReturnType<typeof useUserModal>["formik"];
    name: keyof ReturnType<typeof useUserModal>["formik"]["values"];
    label: string;
    type?: string;
}

const Field = ({ formik, name, label, type = "text" }: FieldProps) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
        <input
            type={type}
            name={name}
            value={formik.values[name] as string}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
        {formik.touched[name] && formik.errors[name] && (
            <p className="text-red-500 text-xs mt-1">{formik.errors[name] as string}</p>
        )}
    </div>
);

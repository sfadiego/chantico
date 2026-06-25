import { ChevronLeft, Loader, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { useTenantForm } from "./useTenantForm";
import { SuperAdminRoutes } from "@/enums/RoutesEnum";

export default function TenantFormPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const tenantId = id ? Number(id) : undefined;
    const { formik, isEdit } = useTenantForm(tenantId);

    const field = (name: keyof typeof formik.values, label: string, type = "text", placeholder = "") => (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
            <input
                type={type}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={placeholder}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            {formik.touched[name] && formik.errors[name] && (
                <p className="text-red-500 text-xs mt-1">{formik.errors[name] as string}</p>
            )}
        </div>
    );

    const colorField = (name: keyof typeof formik.values, label: string) => (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
            <div className="flex items-center gap-2">
                <input
                    type="color"
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                />
                <input
                    type="text"
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
            </div>
            {formik.touched[name] && formik.errors[name] && (
                <p className="text-red-500 text-xs mt-1">{formik.errors[name] as string}</p>
            )}
        </div>
    );

    return (
        <SuperAdminLayout>
            <div className="px-6 py-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(SuperAdminRoutes.Tenants)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                {isEdit ? "Editar cliente" : "Nuevo cliente"}
                            </h1>
                            <p className="text-slate-500 text-sm mt-0.5">
                                {isEdit ? "Modifica la configuración del tenant" : "Registra un nuevo tenant en el sistema"}
                            </p>
                        </div>
                    </div>
                    {isEdit && (
                        <button
                            type="button"
                            onClick={() =>
                                navigate(SuperAdminRoutes.TenantUsers.replace(":id", String(tenantId)))
                            }
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            <Users size={15} />
                            Usuarios
                        </button>
                    )}
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Datos del negocio */}
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                            Datos del negocio
                        </h2>
                        {field("business_name", "Nombre del negocio", "text", "Ej: Café Luna")}
                        {field("slug", "Slug (URL de acceso)", "text", "ej: cafe-luna")}
                        <p className="text-xs text-slate-400">
                            El cliente accederá desde: <span className="font-mono">/{formik.values.slug || "slug"}/login</span>
                        </p>
                    </section>

                    {/* Colores */}
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                            Colores del tema
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {colorField("primary_color", "Color primario")}
                            {colorField("sidebar_color", "Color sidebar")}
                            {colorField("font_color", "Color fuente")}
                            {colorField("label_color", "Color etiqueta")}
                        </div>
                    </section>

                    {/* Admin user — solo al crear */}
                    {!isEdit && (
                        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                                Usuario administrador
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {field("admin_nombre", "Nombre")}
                                {field("admin_apellido", "Apellido")}
                                {field("admin_email", "Correo electrónico", "email")}
                                {field("admin_usuario", "Nombre de usuario")}
                            </div>
                            {field("admin_password", "Contraseña", "password")}
                        </section>
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(SuperAdminRoutes.Tenants)}
                            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-medium transition-colors"
                        >
                            {formik.isSubmitting && <Loader size={14} className="animate-spin" />}
                            {isEdit ? "Guardar cambios" : "Crear cliente"}
                        </button>
                    </div>
                </form>
            </div>
        </SuperAdminLayout>
    );
}

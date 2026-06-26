import { Settings2, Upload } from "lucide-react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { useSettingsPage } from "./useSettingsPage";

export default function SettingsPage() {
    const { settings, isLoading, saving, toggleLogoUpload } = useSettingsPage();

    return (
        <SuperAdminLayout>
            <div className="px-6 py-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <Settings2 size={18} className="text-indigo-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Configuración global</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Opciones que aplican a todos los clientes</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-16">
                        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Logo</h2>

                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <Upload size={16} className="text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-700">Subida de imagen de logo</p>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        Permite que los clientes suban su propio logo desde su panel de configuración.
                                        Requiere almacenamiento persistente configurado.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={settings?.logo_upload_enabled}
                                disabled={saving}
                                onClick={toggleLogoUpload}
                                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none disabled:opacity-50
                                    ${settings?.logo_upload_enabled ? "bg-indigo-600" : "bg-slate-200"}`}
                            >
                                <span
                                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform
                                        ${settings?.logo_upload_enabled ? "translate-x-5" : "translate-x-0"}`}
                                />
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </SuperAdminLayout>
    );
}

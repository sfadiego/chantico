import { Printer, Network, Loader } from "lucide-react";
import { IBusinessConfig } from "@/models/IBusinessConfig";
import { usePrinterSection } from "./usePrinterSection";

interface PrinterSectionProps {
    config: IBusinessConfig | undefined;
}

export const PrinterSection = ({ config }: PrinterSectionProps) => {
    const { formik } = usePrinterSection(config);

    return (
        <form onSubmit={formik.handleSubmit} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 space-y-5">
            <div>
                <h2 className="text-sm font-semibold text-stone-700 mb-0.5">Configuración de impresora</h2>
                <p className="text-xs text-stone-400">Nombre e IP de la impresora térmica</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-stone-600 mb-1.5">
                        <span className="text-amber-500"><Printer size={15} /></span>
                        Nombre de impresora
                    </label>
                    <input
                        type="text"
                        name="printer_name"
                        value={formik.values.printer_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="EPSON_TM-T20"
                        maxLength={100}
                        className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                    />
                    {formik.touched.printer_name && formik.errors.printer_name && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.printer_name}</p>
                    )}
                </div>

                <div>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-stone-600 mb-1.5">
                        <span className="text-amber-500"><Network size={15} /></span>
                        IP de la impresora
                    </label>
                    <input
                        type="text"
                        name="printer_host"
                        value={formik.values.printer_host}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="192.168.123.100"
                        maxLength={100}
                        className="w-full px-3.5 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                    />
                    {formik.touched.printer_host && formik.errors.printer_host && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.printer_host}</p>
                    )}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={formik.isSubmitting || !formik.dirty}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-medium transition-colors"
                >
                    {formik.isSubmitting && <Loader size={14} className="animate-spin" />}
                    Guardar impresora
                </button>
            </div>
        </form>
    );
};

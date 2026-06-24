import { Upload, Trash2, ImageOff } from "lucide-react";
import { IBusinessConfig } from "@/models/IBusinessConfig";
import { useLogoSection } from "./useLogoSection";

interface LogoSectionProps {
    config: IBusinessConfig | undefined;
}

export function LogoSection({ config }: LogoSectionProps) {
    const { inputRef, logoUrl, uploading, removing, handleFileChange, handleRemove } =
        useLogoSection(config);

    return (
        <section className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="text-base font-semibold text-stone-800 mb-4">Logo del negocio</h2>

            <div className="flex items-start gap-6">
                <div className="w-28 h-28 rounded-xl border-2 border-dashed border-stone-200 flex items-center justify-center bg-stone-50 overflow-hidden shrink-0">
                    {logoUrl ? (
                        <img
                            src={logoUrl}
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <ImageOff size={32} className="text-stone-300" />
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-sm text-stone-500">
                        PNG, JPG o WebP. Máximo 2 MB.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <Upload size={15} />
                            {uploading ? "Subiendo…" : logoUrl ? "Cambiar logo" : "Subir logo"}
                        </button>

                        {logoUrl && (
                            <button
                                type="button"
                                onClick={handleRemove}
                                disabled={removing}
                                className="flex items-center gap-2 px-4 py-2 border border-red-200 hover:bg-red-50 disabled:opacity-60 text-red-600 text-sm font-medium rounded-lg transition-colors"
                            >
                                <Trash2 size={15} />
                                {removing ? "Eliminando…" : "Quitar logo"}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleFileChange}
            />
        </section>
    );
}

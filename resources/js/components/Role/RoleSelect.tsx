import { RoleEnum } from "@/enums/RoleEnum";

const ROLE_OPTIONS = [
    { value: RoleEnum.Admin,   label: "Administrador" },
    { value: RoleEnum.Employe, label: "Empleado" },
    { value: RoleEnum.Cocina,  label: "Cocina" },
    { value: RoleEnum.Caja,    label: "Caja" },
];

interface RoleSelectProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name?: string;
    className?: string;
}

export default function RoleSelect({ value, onChange, name = "rol_id", className }: RoleSelectProps) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className={className ?? "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"}
        >
            {ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
}

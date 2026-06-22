import { RoleEnum } from "@/enums/RoleEnum";

export interface IUser {
    id: number;
    nombre: string;
    apellido_materno: string;
    apellido_paterno: string;
    rol_id: number;
    role?: RoleEnum;
    activo: number;
    email: string;
    usuario: string;
    created_at: string;
    updated_at: string;
}

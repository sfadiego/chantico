import { useAxios } from '@/hooks/useAxios';
import React from 'react'
import Swal from 'sweetalert2';

export const LogOut = () => {
    const { logout } = useAxios();
    const handleLogOut = () => {
        Swal.fire({
            icon: "warning",
            title: "Estas por cerrar sesión",
            showDenyButton: true,
            confirmButtonText: "Continuar",
            denyButtonText: `Cancelar`
        }).then(({ isConfirmed }) => isConfirmed && logout());
    }
    return (
        <>
            <button onClick={handleLogOut} className="btn btn-light border" type="submit">
                <i className="bi bi-cup-hot-fill"></i>
            </button>
        </>
    )
}

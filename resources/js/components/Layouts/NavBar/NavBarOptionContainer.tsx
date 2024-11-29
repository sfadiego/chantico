import { ReactNode } from 'react';

export const NavBarOptionContainer = ({ children }: { children?: ReactNode }) => {
    // const { user } = useAxios();
    // if (!user?.rol_id) return false;
    // const { rol_id } = user;
    // const options = rol_id == RoleEnum.Admin ? dashboardWidgetRoutes : dashboardWidgetRoutes.filter(route => {
    //     return !route.isAdmin;
    // });
    return <>
        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            {children}
        </ul>
    </>
}

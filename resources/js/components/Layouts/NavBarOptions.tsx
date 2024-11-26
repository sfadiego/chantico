import navbarRoutes from '../../router/navbar.routes';
import { useAxios } from '@/hooks/useAxios';
import { RoleEnum } from '@/enums/RoleEnum';

export const NavBarOptions = () => {
    const { user } = useAxios();
    if (!user?.rol_id) return false;
    const { rol_id } = user;
    const options = rol_id == RoleEnum.Admin ? navbarRoutes : navbarRoutes.filter(route => {
        return !route.isAdmin;
    });

    return <>
        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            {
                options.map(({ name, itemDisabled, href }, key) => {
                    return <li key={key} className="nav-item">
                        <a className={`nav-link ${itemDisabled ? "disabled" : ''}`} href={`${href}`}>{name}</a>
                    </li>
                })
            }
        </ul>
    </>
}

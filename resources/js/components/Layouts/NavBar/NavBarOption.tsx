import { NavLink } from 'react-router-dom';

export const NavBarOptions = ({ href, label, extraClass }: { href: string, extraClass?: string, label: string }) => {
    return <>
        <li className="nav-item">
            <NavLink className={`nav-link ${extraClass}`} to={href} end> {label} </NavLink>
        </li>
    </>
}

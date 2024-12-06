import { ReactNode } from 'react';

export const NavBarOptionContainer = ({ children }: { children?: ReactNode }) => {
    return <>
        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            {children}
        </ul>
    </>
}

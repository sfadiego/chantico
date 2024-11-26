import { ReactNode } from 'react';
import { Nav } from 'react-bootstrap';
import { NavBarOptions } from './NavBarOptions';//TODO: moverlo a widgets
import { useAxios } from '@/hooks/useAxios';
import { RoleEnum } from '@/enums/RoleEnum';

const NavBarLayout = ({ children, showOptions }: { showOptions?: boolean, children?: ReactNode }) => {
    const { user } = useAxios();
    const dashboardPath = `${user && user.rol_id == RoleEnum.Admin ? '/admin' : '/user'}`;
    return (
        <>
            <Nav className="navbar navbar-expand-sm border-bottom">
                <div className="container-fluid">
                    <a className="navbar-brand" href={`${dashboardPath}/dashboard`}>
                        <i className="bi bi-cup-hot-fill"></i> Chantico
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarChantico"
                        aria-controls="navbarChantico" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarChantico">
                        <NavBarOptions />
                        {children}
                    </div>
                </div>

            </Nav>
        </>
    )
}

export default NavBarLayout;
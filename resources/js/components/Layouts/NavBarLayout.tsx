import { ReactNode } from 'react';
import { Nav } from 'react-bootstrap';
import { NavBarOptions } from './NavBarOptions';

const NavBarLayout = ({ children }: { children?: ReactNode }) => {

    return (
        <>
            <Nav className="navbar navbar-expand-sm border-bottom">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Chantico
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
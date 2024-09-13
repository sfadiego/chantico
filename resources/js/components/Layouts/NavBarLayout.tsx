import React from 'react'
import { Nav } from 'react-bootstrap';

const options = [
    {
        icon: 'bi-journals',
        href: '/user/order-list',
    }
];

const NavBarLayout = () => {
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
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Mesas</a>
                            </li>
                        </ul>
                        <form className="col-md-3" role="search">
                            <input className="form-control" type="search" placeholder="Buscar productos" aria-label="Search" />
                        </form>
                    </div>
                </div>

            </Nav>
        </>
    )
}

export default NavBarLayout;
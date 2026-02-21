import { ReactNode } from "react";
import { Nav } from "react-bootstrap";
import { LogOut } from "../../components/AuthLayout/LogOut";
import { Link } from "react-router-dom";

const NavBarLayout = ({ children }: { children?: ReactNode }) => {
    return (
        <>
            <Nav className="navbar navbar-expand-sm border-bottom">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={`/`}>
                        <i className="bi bi-cup-hot-fill" /> Chantico
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarChantico"
                        aria-controls="navbarChantico"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse me-2"
                        id="navbarChantico"
                    >
                        {children}
                    </div>
                    <div className="d-flex">
                        <LogOut />
                    </div>
                </div>
            </Nav>
        </>
    );
};

export default NavBarLayout;

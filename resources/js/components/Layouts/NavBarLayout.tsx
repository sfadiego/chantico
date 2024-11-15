import { Nav } from 'react-bootstrap';

const options = [
    {
        icon: '',
        name: 'Ordenes',
        href: '/order-list',
    }
];

const NavBarLayout = ({ children, setSearchProduct }: any) => {
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
                            {
                                options.map(({ name, href }, key) => {
                                    return <li key={key} className="nav-item">
                                        <a className="nav-link" href={`${href}`}>{name}</a>
                                    </li>
                                })
                            }
                        </ul>
                        {children}
                    </div>
                </div>

            </Nav>
        </>
    )
}

export default NavBarLayout;
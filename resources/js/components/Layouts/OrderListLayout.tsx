import React from 'react';
import NavBarLayout from './NavBar/NavBarLayout';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Row } from 'react-bootstrap';
import { TableOrderList } from './Tables/TableOrderList';

export const OrderListLayout = () => {
    return (
        <>
            <NavBarLayout/>
            <main className="container-fluid p-4">
                <Row>
                    <TableOrderList/>
                </Row>
            </main>
        </>
    )
}

export default OrderListLayout;
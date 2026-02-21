import React from "react";
import NavBarLayout from "../../Layouts/NavBar/NavBarLayout";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Row } from "react-bootstrap";
import { TableOrderList } from "../../Layouts/Tables/TableOrderList";

export default function OrderListPage() {
    return (
        <>
            <NavBarLayout />
            <main className="container-fluid p-4">
                <Row>
                    <TableOrderList />
                </Row>
            </main>
        </>
    );
}

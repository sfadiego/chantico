import NavBarLayout from "@/Layouts/NavBar/NavBarLayout";
import { NavBarOptionContainer } from "@/Layouts/NavBar/NavBarOptionContainer";
import { TableMainSalesList } from "@/Layouts/Tables/TableMainSalesList";
import { Alert, Col, Row } from "react-bootstrap";

export default function SalesListPage() {
    return (
        <>
            <NavBarLayout>
                <NavBarOptionContainer />
            </NavBarLayout>
            <main className="container-fluid p-4">
                <Row>
                    <Col md={12}>
                        <h1>Ventas</h1>
                        <Alert variant="warning">
                            Total de ventas por dia al cierre de caja
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <TableMainSalesList search={``} />
                </Row>
            </main>
        </>
    );
}

import NavBarLayout from '@/components/Layouts/NavBar/NavBarLayout'
import { NavBarOptionContainer } from '@/components/Layouts/NavBar/NavBarOptionContainer'
import { Alert, Col, Row } from 'react-bootstrap'
import { TableMainSalesList } from '@/components/Layouts/Tables/TableMainSalesList'

const SaleListLayout = () => {
    return (
        <>
            <NavBarLayout >
                <NavBarOptionContainer >
                </NavBarOptionContainer>
            </NavBarLayout>
            <main className="container-fluid p-4">
                <Row>
                    <Col md={12}>
                        <h1>Ventas</h1>
                        <Alert variant='warning' >
                            Total de ventas por dia despues de cierre de caja
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <TableMainSalesList search={``} />
                </Row>
            </main>
        </>
    )
}

export default SaleListLayout;
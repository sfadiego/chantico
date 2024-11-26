import NavBarLayout from "@/components/Layouts/NavBarLayout";
import { Button, Col, Row } from "react-bootstrap";

const Dashboard = () => {
    return (
        <>
            <NavBarLayout ></NavBarLayout>
            <main className="container-fluid p-4">
                <Row>
                    <Col md={12} className='mb-3'>
                        <Button variant="primary">
                            <i className="bi bi-plus-circle"></i> Nueva Orden
                        </Button>
                    </Col>
                    <Col md={12}>
                    </Col>
                </Row>
            </main>
            {/* <ModalNewOrder></ModalNewOrder> */}
        </>
    )
}
export default Dashboard;

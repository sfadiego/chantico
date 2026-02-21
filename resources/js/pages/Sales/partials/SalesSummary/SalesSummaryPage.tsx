import { Col, Container, Image, Row, Table } from "react-bootstrap";
import img from "@assets/logo_chantico.png";
import { useDetailOfCloseSales } from "@/services/useOpenSalesService";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import { AdminRoutes } from "@/router/modules/admin.routes";
import LoadingComponent from "@/Layouts/LoadingComponent";
import { SummaryOrdersTable } from "@/Layouts/Tables/SummaryOrdersTable";

const useDetailSale = (systemId: number) => {
    const { isLoading, data, refetch } = useDetailOfCloseSales(systemId);

    return {
        isLoading: isLoading,
        showData: !isLoading && data && true,
        data: data?.data,
        refetch,
    };
};

const SalesSummaryPage = () => {
    const { id } = useParams();
    const { isLoading, data } = useDetailSale(Number(id));
    if (isLoading) return <LoadingComponent />;
    const {
        efectivo_caja_inicio,
        efectivo_caja_cierre,
        created_at,
        venta_dia,
        orders,
    } = data;

    const date = moment(created_at).format("MMMM Do YYYY");
    return (
        <Container>
            <Row className="justify-content-md-center">
                <div className="col-md-auto">
                    <Image
                        style={{ width: "15rem" }}
                        className="img-fluid"
                        src={img}
                    />
                </div>
            </Row>
            <Row className="">
                <Col md={12}>
                    <h1>Ventas de dia</h1>
                </Col>
                <Col md={12} className="mt-4">
                    <p>
                        <b>Fecha</b>: {date}
                    </p>
                    <p>
                        <b>Efectivo al iniciar ventas</b>: $
                        {efectivo_caja_inicio}
                    </p>
                    <p>
                        <b>Venta Total</b>: ${venta_dia}
                    </p>
                    <p>
                        <b>Efectivo Total</b>: ${efectivo_caja_cierre}
                    </p>
                </Col>
                <Col md={12} className="mt-4">
                    <NavLink
                        className={`btn btn-secondary`}
                        to={AdminRoutes.Dashboard}
                        end
                    >
                        Regresar
                    </NavLink>
                </Col>
                <Col md={12} className="mt-4">
                    <SummaryOrdersTable orders={orders} />
                </Col>
            </Row>
        </Container>
    );
};

export default SalesSummaryPage;

import React, { useEffect } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Container, Image, Row } from "react-bootstrap";
import img from "@assets/logo_chantico.png";
import { AppConfig } from "@/configs/appConfig";
import { useNavigate } from "react-router-dom";
import { AdminRoutes } from "@/router/modules/admin.routes";
import LoadingComponent from "@/Layouts/LoadingComponent";
import { CloseSalesForm } from "@/Layouts/Sales/CloseSalesForm";
import { useGetActiveSale } from "@/services/useOpenSalesService";

const CloseSalesPage = () => {
    const { sistemaId } = useAxios();
    const navigate = useNavigate();
    let { isLoading, data, refetch } = useGetActiveSale();
    useEffect(() => {
        if (!data?.id) {
            navigate(AdminRoutes.Dashboard);
        }
    }, [data]);

    if ((isLoading && !data) || !data) return <LoadingComponent />;
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
            <Row className="justify-content-md-center">
                <div className="col-md-12 text-center">
                    <h1>
                        <b>{AppConfig.AppName}</b>
                    </h1>
                </div>
                <CloseSalesForm sistemaId={sistemaId} systemInfo={data} />
            </Row>
        </Container>
    );
};
export default CloseSalesPage;

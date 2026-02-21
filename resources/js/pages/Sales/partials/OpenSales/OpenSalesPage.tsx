import { Container, Image, Row } from "react-bootstrap";
import { AppConfig } from "../../../../configs/appConfig";
import img from "@assets/logo_chantico.png";
import { OpenSalesForm } from "@/Layouts/Sales/OpenSalesForm";
import { ActiveSale } from "@/Layouts/Sales/ActiveSale";
import { SalesStatusEnum } from "@/enums/SalesStatusEnum";
import LoadingComponent from "@/Layouts/LoadingComponent";
import { useGetActiveSale } from "@/services/useOpenSalesService";

const Component = ({ status }: { status: number }) => {
    if (status == SalesStatusEnum.Open) {
        return <ActiveSale />;
    }

    return <OpenSalesForm />;
};

export default function OpenSalesPage() {
    let { isLoading, data } = useGetActiveSale();
    if (isLoading && !data) return <LoadingComponent />;
    const estatus_caja = data?.estatus_caja ?? 0;
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
                        Bienvenidos a <b>{AppConfig.AppName}</b>
                    </h1>
                </div>
                <div className="col-md-12 mt-2 mb-2">
                    <Component status={estatus_caja} />
                </div>
            </Row>
        </Container>
    );
}

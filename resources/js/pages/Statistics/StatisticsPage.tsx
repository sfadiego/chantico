import { Col, Row } from "react-bootstrap";
import { AdminRoutes } from "@/router/modules/admin.routes";
import NavBarLayout from "@/Layouts/NavBar/NavBarLayout";
import { NavBarOptions } from "@/Layouts/NavBar/NavBarOption";
import { NavBarOptionContainer } from "@/Layouts/NavBar/NavBarOptionContainer";
import { Widget } from "@/Layouts/Widgets/Widget";
import { BestSellerWidgetContent } from "@/Layouts/Widgets/BestSeller";

export default function StatisticsPage() {
    return (
        <>
            <NavBarLayout>
                <NavBarOptionContainer>
                    <NavBarOptions
                        label="Productos"
                        href={AdminRoutes.ProductsPage}
                    />
                    <NavBarOptions
                        label="Categorías"
                        href={AdminRoutes.CategoryList}
                    />
                    <NavBarOptions
                        label="Estadísticas"
                        href={AdminRoutes.Statistics}
                    />
                    <NavBarOptions label="Ventas" href={AdminRoutes.SaleList} />
                </NavBarOptionContainer>
            </NavBarLayout>
            <main className="container-fluid p-4">
                <Row>
                    <Col md={4}>
                        <Widget
                            cardTitle="Best sellers"
                            description="Top 3 Productos mas vendidos del mes"
                            children={<BestSellerWidgetContent />}
                        />
                    </Col>
                </Row>
            </main>
        </>
    );
}

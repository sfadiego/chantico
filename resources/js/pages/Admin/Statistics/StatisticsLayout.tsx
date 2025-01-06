import NavBarLayout from '@/components/Layouts/NavBar/NavBarLayout'
import { NavBarOptions } from '@/components/Layouts/NavBar/NavBarOption'
import { NavBarOptionContainer } from '@/components/Layouts/NavBar/NavBarOptionContainer'
import { Col, Row } from 'react-bootstrap'
import { RoutesAdmin } from '@/router/modules/admin.routes'
import { Widget } from '@/components/Layouts/Widgets/Widget'
import { BestSellerWidgetContent } from '@/components/Layouts/Widgets/BestSeller'


const StatisticsLayout = () => {
    return <>
        <NavBarLayout >
            <NavBarOptionContainer>
                <NavBarOptions label="Productos" href={RoutesAdmin.ProductList} />
                <NavBarOptions label="Categorias" href={RoutesAdmin.CategoryList} />
                <NavBarOptions label="Estadisticas" href={RoutesAdmin.Statistics} />
            </NavBarOptionContainer>
        </NavBarLayout>
        <main className="container-fluid p-4">
            <Row>
                <Col md={4}>
                    <Widget cardTitle="Best sellers"
                        description="Top 3 Productos mas vendidos del mes" 
                        children={<BestSellerWidgetContent />}
                    />
                </Col>
            </Row>
        </main>
    </>
}

export default StatisticsLayout;
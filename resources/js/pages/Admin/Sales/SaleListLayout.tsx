import NavBarLayout from '@/components/Layouts/NavBar/NavBarLayout'
import { NavBarOptionContainer } from '@/components/Layouts/NavBar/NavBarOptionContainer'
import { Row } from 'react-bootstrap'
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
                    <TableMainSalesList search={``} />
                </Row>
            </main>
        </>
    )
}

export default SaleListLayout;
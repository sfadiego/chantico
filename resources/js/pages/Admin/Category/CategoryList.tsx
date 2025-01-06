import NavBarLayout from '../../../components/Layouts/NavBar/NavBarLayout'
import { NavBarOptionContainer } from '../../../components/Layouts/NavBar/NavBarOptionContainer'
import { Row } from 'react-bootstrap'
import { TableCategoryList } from '../../../components/Layouts/Tables/TableCategoryList'
import { NavBarOptions } from '@/components/Layouts/NavBar/NavBarOption'
import { RoutesAdmin } from '@/router/modules/admin.routes'

const CategoryList = () => {
  return (
    <>
      <NavBarLayout >
        <NavBarOptionContainer>
          <NavBarOptions label="Productos" href={RoutesAdmin.ProductList} />
          <NavBarOptions label="Categorias" href={RoutesAdmin.CategoryList} />
          <NavBarOptions label="Estadisticas" href={RoutesAdmin.Statistics} />
        </NavBarOptionContainer>
      </NavBarLayout>
      <main className="container-fluid p-4">
        <Row>
          <TableCategoryList />
        </Row>
      </main>
    </>
  )
}
export default CategoryList;

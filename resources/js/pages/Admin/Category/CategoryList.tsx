import NavBarLayout from '../../../components/Layouts/NavBar/NavBarLayout'
import { NavBarOptionContainer } from '../../../components/Layouts/NavBar/NavBarOptionContainer'
import { Row } from 'react-bootstrap'
import { TableCategoryList } from '../../../components/Layouts/Tables/TableCategoryList'
import { NavBarOptions } from '@/components/Layouts/NavBar/NavBarOption'
import { RoutesAdmin } from '@/router/modules/admin.routes'
import { useState } from 'react'

const CategoryList = () => {
  const [categoryName, setSearchCategory] = useState<string>('');
  return (
    <>
      <NavBarLayout >
        <NavBarOptionContainer>
          <NavBarOptions label="Productos" href={RoutesAdmin.ProductList} />
          <NavBarOptions label="Categorias" href={RoutesAdmin.CategoryList} />
          <NavBarOptions label="Estadisticas" href={RoutesAdmin.Statistics} />
          <NavBarOptions label="Ventas" href={RoutesAdmin.SaleList} />
        </NavBarOptionContainer>
        <form className="col-md-3" role="search">
          <input className="form-control" type="search"
            onChange={(e) => setSearchCategory(e.target.value)}
            placeholder="Buscar categoria" aria-label="Search" />
        </form>
      </NavBarLayout>
      <main className="container-fluid p-4">
        <Row>
          <TableCategoryList search={categoryName} />
        </Row>
      </main>
    </>
  )
}
export default CategoryList;

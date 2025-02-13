import React, { useState } from 'react'
import NavBarLayout from '../../../components/Layouts/NavBar/NavBarLayout'
import { NavBarOptionContainer } from '../../../components/Layouts/NavBar/NavBarOptionContainer'
import { Row } from 'react-bootstrap'
import { TableProductList } from '../../../components/Layouts/Tables/TableProductList'
import { NavBarOptions } from '@/components/Layouts/NavBar/NavBarOption'
import { RoutesAdmin } from '@/router/modules/admin.routes'

const ProductList = () => {
  const [productName, setSearchProduct] = useState<string>('');
  return (
    <>
      <NavBarLayout >
        <NavBarOptionContainer >
          <NavBarOptions label="Productos" href={RoutesAdmin.ProductList} />
          <NavBarOptions label="Categorías" href={RoutesAdmin.CategoryList} />
          <NavBarOptions label="Estadísticas" href={RoutesAdmin.Statistics} />
          <NavBarOptions label="Ventas" href={RoutesAdmin.SaleList} />
        </NavBarOptionContainer>
        <form className="col-md-3" role="search">
          <input className="form-control" type="search"
            onChange={(e) => setSearchProduct(e.target.value)}
            placeholder="Buscar productos" aria-label="Search" />
        </form>
      </NavBarLayout>
      <main className="container-fluid p-4">
        <Row>
          <TableProductList search={productName} />
        </Row>
      </main>
    </>
  )
}

export default ProductList;
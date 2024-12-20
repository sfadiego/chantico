import React from 'react'
import NavBarLayout from '../../../components/Layouts/NavBar/NavBarLayout'
import { NavBarOptionContainer } from '../../../components/Layouts/NavBar/NavBarOptionContainer'
import { Row } from 'react-bootstrap'
import { TableProductList } from '../../../components/Layouts/Tables/TableProductList'

export const ProductList = () => {
  return (
    <>
      <NavBarLayout >
        <NavBarOptionContainer/>
      </NavBarLayout>
      <main className="container-fluid p-4">
        <Row>
          <TableProductList />
        </Row>
      </main>
    </>
  )
}

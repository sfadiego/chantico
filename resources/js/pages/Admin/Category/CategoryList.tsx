import React from 'react'
import NavBarLayout from '../../../components/Layouts/NavBar/NavBarLayout'
import { NavBarOptionContainer } from '../../../components/Layouts/NavBar/NavBarOptionContainer'
import { Row } from 'react-bootstrap'
import { TableProductList } from '../../../components/Layouts/Tables/TableProductList'
import { TableCategoryList } from '../../../components/Layouts/Tables/TableCategoryList'

export const CategoryList = () => {
  return (
    <>
      <NavBarLayout >
        <NavBarOptionContainer />
      </NavBarLayout>
      <main className="container-fluid p-4">
        <Row>
          <TableCategoryList />
        </Row>
      </main>
    </>
  )
}

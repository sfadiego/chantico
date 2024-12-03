import React from 'react'
import NavBarLayout from '../NavBar/NavBarLayout'
import { NavBarOptionContainer } from '../NavBar/NavBarOptionContainer'
import { Row } from 'react-bootstrap'
import { TableProductList } from '../Tables/TableProductList'
import { TableCategoryList } from '../Tables/TableCategoryList'

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

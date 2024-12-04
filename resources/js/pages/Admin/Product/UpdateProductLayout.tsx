import NavBarLayout from '@/components/Layouts/NavBar/NavBarLayout'
import { NavBarOptions } from '@/components/Layouts/NavBar/NavBarOption'
import { NavBarOptionContainer } from '@/components/Layouts/NavBar/NavBarOptionContainer'
import { UpdateProductForm } from '@/components/Layouts/Products/UpdateProductForm'
import { RoutesAdmin } from '@/router/modules/admin.routes'

export const UpdateProductLayout = () => {
  return (
    <>
      <NavBarLayout >
        <NavBarOptionContainer>
          <NavBarOptions label="Productos" href={RoutesAdmin.ProductList} />
        </NavBarOptionContainer>
      </NavBarLayout>
      <main className="container-fluid p-4">
        <UpdateProductForm></UpdateProductForm>
      </main>
    </>
  )
}

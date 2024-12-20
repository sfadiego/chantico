import { UpdateCategoryForm } from '@/components/Layouts/Categories/UpdateCategoryForm'
import NavBarLayout from '@/components/Layouts/NavBar/NavBarLayout'
import { NavBarOptions } from '@/components/Layouts/NavBar/NavBarOption'
import { NavBarOptionContainer } from '@/components/Layouts/NavBar/NavBarOptionContainer'
import { RoutesAdmin } from '@/router/modules/admin.routes'

export const UpdateCategoryLayout = () => {
  return (
    <>
      <NavBarLayout >
        <NavBarOptionContainer>
          <NavBarOptions label="categorias" href={RoutesAdmin.CategoryList} />
        </NavBarOptionContainer>
      </NavBarLayout>
      <main className="container-fluid p-4">
        <UpdateCategoryForm />
      </main>
    </>
  )
}

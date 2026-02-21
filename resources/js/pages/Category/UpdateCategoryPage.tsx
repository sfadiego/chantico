import { AdminRoutes } from "@/router/modules/admin.routes";
import { UpdateCategoryForm } from "@/Layouts/Categories/UpdateCategoryForm";
import NavBarLayout from "@/Layouts/NavBar/NavBarLayout";
import { NavBarOptions } from "@/Layouts/NavBar/NavBarOption";
import { NavBarOptionContainer } from "@/Layouts/NavBar/NavBarOptionContainer";

export default function UpdateCategoryPage() {
    return (
        <>
            <NavBarLayout>
                <NavBarOptionContainer>
                    <NavBarOptions
                        label="categorias"
                        href={AdminRoutes.CategoryList}
                    />
                </NavBarOptionContainer>
            </NavBarLayout>
            <main className="container-fluid p-4">
                <UpdateCategoryForm />
            </main>
        </>
    );
}

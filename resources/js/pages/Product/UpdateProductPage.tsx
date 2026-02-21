import NavBarLayout from "@/Layouts/NavBar/NavBarLayout";
import { NavBarOptions } from "@/Layouts/NavBar/NavBarOption";
import { NavBarOptionContainer } from "@/Layouts/NavBar/NavBarOptionContainer";
import { UpdateProductForm } from "@/Layouts/Products/UpdateProductForm";
import { AdminRoutes } from "@/router/modules/admin.routes";

export default function UpdateProductPage() {
    return (
        <>
            <NavBarLayout>
                <NavBarOptionContainer>
                    <NavBarOptions
                        label="Productos"
                        href={AdminRoutes.ProductsPage}
                    />
                </NavBarOptionContainer>
            </NavBarLayout>
            <main className="container-fluid p-4">
                <UpdateProductForm></UpdateProductForm>
            </main>
        </>
    );
}

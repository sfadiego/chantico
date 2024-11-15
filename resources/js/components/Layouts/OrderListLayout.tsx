import { useState } from 'react'
import NavBarLayout from './NavBarLayout';
import "bootstrap-icons/font/bootstrap-icons.css";
import '@css/dashboardLayout.css'
// import SidebarLayout from './Sidebar/SidebarLayout';
import { Container, Row } from 'react-bootstrap';
import { TableOrderList } from './Tables/TableOrderList';
// import { CategoriesTabs } from './Categories/CategoriesTabs';
// import { ProductsContainer } from './Products/ProductsContainer';
// import useGetOrderDetail from '@/hooks/useOrderDetail';
// import LoadingComponent from './LoadingComponent';

export const OrderListLayout = () => {
    // const [categoryId, setCategoryId] = useState<number>(0);
    // const [productName, setSearchProduct] = useState<string>('');
    // const [activeTab, setactiveTab] = useState(0)
    // const selectCategory = (categoryId: number) => setCategoryId(categoryId);
    // let { isLoading, order, productsInOrder, refetch } = useGetOrderDetail(orderId);
    // if (isLoading) return <LoadingComponent></LoadingComponent>;
    return (
        <>
            <NavBarLayout ></NavBarLayout>
            <main className="container">
                <Row>
                    <TableOrderList></TableOrderList>
                </Row>
            </main>
        </>
    )
}

export default OrderListLayout;
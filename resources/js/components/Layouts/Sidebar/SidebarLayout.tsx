import ItemAdded from './ItemAdded';
import { TotalItem } from './TotalItem';
import ButtonComponent from '../../Button/ButtonComponent';
import ItemDetail from './ItemDetail';
import { IOrderProduct } from '@/intefaces/IOrderProduct';
import { IOrder } from '@/intefaces/IOrder';
import { useState } from 'react';

interface SidebarProps {
    order: IOrder,
    productsInOrder: IOrderProduct[]
};
const SidebarLayout = ({ order, productsInOrder }: SidebarProps) => {
    const { id: orderId, total, subtotal, descuento, nombre_pedido } = order;
    const [showSelectedProduct, setshowSelectedProduct] = useState({ productId: 0, showDetail: false });
    const setProduct = (productId: number) => setshowSelectedProduct({ ...showSelectedProduct, productId, showDetail: true });
    const { productId, showDetail } = showSelectedProduct
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary content-wrapper">
                <a href="/" className="d-flex text-dark text-decoration-none">
                    <span className="fs-4">{nombre_pedido}</span>
                </a>
                <hr className="mt2 mb-2" />
                <div className="mb-auto">
                    {
                        productsInOrder.map(({ product: { nombre }, producto_id, cantidad, precio, }, index) =>
                            <ItemAdded productId={producto_id}
                                key={index}
                                setProduct={setProduct}
                                price={precio}
                                label={nombre}
                                items={cantidad} />
                        )
                    }
                </div>
                <ItemDetail orderId={orderId} currentProductId={productId} show={showDetail}></ItemDetail>
                <hr className="mt-2 mb-2" />
                <div className="d-flex text-secondary">
                    <div className="flex-fill ">
                        <ButtonComponent className="btn btn-info col-12" type='button'>
                            <i className="bi bi-printer"></i>
                        </ButtonComponent>
                    </div>
                    <div className="ps-1 flex-fill">
                        <ButtonComponent className="btn btn-warning col-12">
                            <i className="bi bi-percent"></i>
                        </ButtonComponent>
                    </div>
                </div>
                <hr className="mt-2 mb-2" />
                <TotalItem ammount={subtotal} wrapperClass='text-secondary' label={`Subtotal`}></TotalItem>
                <TotalItem ammount={descuento} wrapperClass='text-secondary' label={`Descuento`}></TotalItem>
                <TotalItem ammount={total} label={`Total`}></TotalItem>
                <div className="d-grid  mt-2 gap-2">
                    <ButtonComponent className="btn btn-success" type='button'>
                        Pagar ${total}
                    </ButtonComponent>
                </div>
            </div>
            <div className="border-end b-vr calculate-height"></div>
        </>
    )
}

export default SidebarLayout;
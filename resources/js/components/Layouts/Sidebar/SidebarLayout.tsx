import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ItemAdded from './ItemAdded';
import { TotalItem } from './TotalItem';
import ItemDetail from './ItemDetail';
import { IOrderProduct } from '@/intefaces/IOrderProduct';
import { IOrder } from '@/intefaces/IOrder';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { ModalDiscountOrder } from '../Modals/ModalDiscountOrder';
import { ModalDiscountProduct } from '../Modals/ModalDiscountProduct';

interface SidebarProps {
    order: IOrder,
    productsInOrder: IOrderProduct[],
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
};
const SidebarLayout = ({ order, productsInOrder, refetch }: SidebarProps) => {
    const { id: orderId, total, subtotal, descuento, nombre_pedido } = order;
    const [showSelectedProduct, setshowSelectedProduct] = useState({ productId: 0, showDetail: false });
    const [showSelectedProductModal, setshowSelectedProductModal] = useState({ productId: 0, descuento: 0 });

    const setProduct = (productId: number) => setshowSelectedProduct({ ...showSelectedProduct, productId, showDetail: true });
    const setShowProduct = (show: boolean) => setshowSelectedProduct({ ...showSelectedProduct, showDetail: show });

    const setProductDiscount = (productId: number) => {
        const product = productsInOrder.filter(product => product.producto_id === productId).shift();
        const descuento = product ? product.descuento : 0;
        setshowSelectedProductModal({ ...showSelectedProductModal, productId, descuento })
    };

    const { productId, showDetail } = showSelectedProduct;
    const { productId: selectedProductIdDiscount, descuento: selectedProductDiscount } = showSelectedProductModal;
    const [show, setShow] = useState(false);
    const [showDiscountProductModal, setShowDiscountProductModal] = useState(false);
    return (
        <>
            {
                show && <ModalDiscountOrder
                    show={show}
                    refetch={refetch}
                    closeModal={setShow}
                    orderId={orderId} />
            }
            {
                showDiscountProductModal && <ModalDiscountProduct
                    show={showDiscountProductModal}
                    productId={selectedProductIdDiscount}
                    descuento={selectedProductDiscount}
                    orderId={orderId}
                    refetch={refetch}
                    closeModal={setShowDiscountProductModal}
                />
            }
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary content-wrapper">
                <a href="/" className="d-flex text-dark text-decoration-none">
                    <span className="fs-4">{nombre_pedido}</span>
                </a>
                <hr className="mt2 mb-2" />
                <div className="mb-auto">
                    {
                        !productsInOrder.length && (
                            <>
                                <i className="bi bi-cup-hot"></i> Sin Productos
                            </>
                        )
                    }
                    {
                        productsInOrder.map(({ product: { nombre }, producto_id, cantidad, precio, descuento }, index) =>
                            <ItemAdded productId={producto_id}
                                key={index}
                                setProduct={setProduct}
                                setProductDiscount={setProductDiscount}
                                setShowDiscountProductModal={setShowDiscountProductModal}
                                price={precio}
                                descuento={descuento}
                                label={nombre}
                                items={cantidad} />
                        )
                    }
                </div>
                {
                    (showDetail && productId) && <ItemDetail
                        orderId={orderId} currentProductId={productId}
                        refetch={refetch}
                        setShowDetail={() => setShowProduct(false)}
                        show={showDetail} />
                }
                <hr className="mt-2 mb-2" />
                <div className="d-flex text-secondary">
                    <div className="flex-fill ">
                        <Button className="btn btn-info col-12" type='button'>
                            <i className="bi bi-printer"></i>
                        </Button>
                    </div>
                    <div className="ps-1 flex-fill">
                        <Button onClick={() => setShow(true)} className="btn btn-warning col-12">
                            <i className="bi bi-percent"></i>
                        </Button>
                    </div>
                </div>
                <hr className="mt-2 mb-2" />
                <TotalItem ammount={subtotal} wrapperClass='text-secondary' label={`Subtotal`}></TotalItem>
                <TotalItem ammount={descuento} wrapperClass='text-secondary' label={`Descuento`}></TotalItem>
                <TotalItem ammount={total} label={`Total`}></TotalItem>
                <div className="d-grid  mt-2 gap-2">
                    <Button className="btn btn-success" type='button'>
                        Pagar ${total}
                    </Button>
                </div>
            </div>
            <div className="border-end b-vr calculate-height"></div>
        </>
    )
}

export default SidebarLayout;
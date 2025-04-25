import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ItemAdded from './ItemAdded';
import { TotalItem } from './TotalItem';
import ItemDetail from './ItemDetail';
import { IOrderProduct } from '@/intefaces/IOrderProduct';
import { IOrder } from '@/intefaces/IOrder';
import { QueryObserverResult, RefetchOptions, UseMutateAsyncFunction } from '@tanstack/react-query';
import { ModalDiscountOrder } from '../Modals/ModalDiscountOrder';
import { ModalDiscountProduct } from '../Modals/ModalDiscountProduct';
import { ModalCalculatePayment } from '../Modals/ModalCalculatePayment';
import { OrderStatusEnum } from '@/enums/OrderStatusEnum';
import { Link } from 'react-router-dom';
import { RoutesUser } from '@/router/modules/users.routes';
import { useIndexPrintOrder } from '@/services/useOrderService';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

//TODO: MOVER A HOOK
const usePrintOrder = (
    mutateAsync: UseMutateAsyncFunction<AxiosResponse<any>, Error, any>
) => {
    const { onSubmit } = useOnSubmit({
        mutateAsync,
        onSuccess: (data) => { return; }
    });

    onSubmit({}, {
        setErrors: (errors: any) => toast.error(errors.message)
    });
}
interface SidebarProps {
    order: IOrder,
    productsInOrder: IOrderProduct[] | [],
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>
};
const SidebarLayout = ({ order, productsInOrder = [], refetch }: SidebarProps) => {
    const { id: orderId, total, subtotal, estatus_pedido_id, descuento, nombre_pedido } = order;
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
    const [showCalculatePayModal, setShowCalculatePayModal] = useState(false);
    const handlePay = () => setShowCalculatePayModal(true);
    const disabledPay = estatus_pedido_id == OrderStatusEnum.Closed || !productsInOrder.length;

    const mutate = useIndexPrintOrder(orderId);
    const handlePrint = () => usePrintOrder(mutate.mutateAsync);
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
            {
                showCalculatePayModal && <ModalCalculatePayment
                    show={showCalculatePayModal}
                    total={total}
                    refetch={refetch}
                    orderId={orderId}
                    closeModal={setShowCalculatePayModal}
                />
            }
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary content-wrapper">
                <Link className="d-flex text-dark text-decoration-none" to={RoutesUser.OrderList}>
                    <span className="fs-4">{nombre_pedido}</span>
                </Link>
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
                                disabledActions={estatus_pedido_id == OrderStatusEnum.Closed ? true : false}
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
                        <Button className="btn btn-info col-12" onClick={handlePrint} type='submit'>
                            <i className="bi bi-printer"></i>
                        </Button>
                    </div>
                    <div className="ps-1 flex-fill">
                        <Button
                            disabled={estatus_pedido_id == OrderStatusEnum.Closed ? true : false}
                            onClick={() => setShow(true)} className="btn btn-warning col-12">
                            <i className="bi bi-percent"></i>
                        </Button>
                    </div>
                </div>
                <hr className="mt-2 mb-2" />
                <TotalItem ammount={subtotal} wrapperClass='text-secondary' label={`Subtotal`}></TotalItem>
                <TotalItem ammount={descuento} wrapperClass='text-secondary' label={`Descuento`}></TotalItem>
                <TotalItem ammount={total} label={`Total`}></TotalItem>
                <div className="d-grid  mt-2 gap-2">
                    <Button onClick={() => handlePay()}
                        disabled={disabledPay}
                        className="btn btn-success" type='button'>
                        Pagar ${total}
                    </Button>
                </div>
            </div>
            <div className="border-end b-vr calculate-height"></div>
        </>
    )
}

export default SidebarLayout;
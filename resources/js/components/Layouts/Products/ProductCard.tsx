import { Card, CardBody, Image, Row } from 'react-bootstrap'
import LoadingComponent from '../LoadingComponent';
import useLoadFile from '@/hooks/useLoadFile';
import { IProductCardProps } from '@/components/Layouts/Products/IProductCardProps';
import { useAddProductToOrder } from '@/services/useOrderService';

export const ProductCard = ({ picture, price, name, classCard, id, currentOrderId }: IProductCardProps) => {
    const { showImage, isLoading, data } = useLoadFile({ picture });

    const { mutateAsync, isError, isSuccess, error } = useAddProductToOrder(currentOrderId);
    const handleClick = async (productId: number) => {
        const data = {
            cantidad: 1,
            precio: price,
            producto_id: productId,
            pedido_id: currentOrderId,
        };
        const resp = await mutateAsync(data);
        console.log(resp);
    }

    return (
        <div onClick={() => handleClick(id)} className={`${classCard ? classCard : 'col-lg-3 col-md-4 col-12 col-sm-6 col-xl-2 p-1'}`}>
            <Card className='rounded-0 pb-1'>
                {
                    isLoading ? (
                        <LoadingComponent extraClass='text-center' />
                    ) : (
                        showImage && <Image className='rounded-0' src={URL.createObjectURL(new Blob([data!!]))} />
                    )
                }

                <CardBody className=''>
                    <p className="card-text text-secondary">{name}</p>
                    <b> ${price}</b>
                </CardBody>
            </Card>
        </div>
    )
}

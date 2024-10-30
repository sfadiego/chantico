import { Card, CardBody, Image, Row } from 'react-bootstrap'
import LoadingComponent from '../LoadingComponent';
import useLoadFile from '@/hooks/useLoadFile';
import { IProductCardProps } from '@/components/Layouts/Products/IProductCardProps';
import { useAddProductToOrder } from '@/services/useOrderService';
import { useAddOrderProduct } from './useAddOrderProduct';

export const ProductCard = ({ picture, price, name, classCard, id, currentOrderId, refetch }: IProductCardProps) => {
    const { showImage, isLoading, data } = useLoadFile({ picture });
    const mutate = useAddProductToOrder(currentOrderId);
    const { onSubmit } = useAddOrderProduct({ mutateAsync: mutate.mutateAsync, refetch });
    const handleClick = async (productId: number) => {
        const data = {
            cantidad: 1,
            precio: price,
            producto_id: productId,
        };
        onSubmit(data, {
            setErrors: (errors: any) =>
                console.log("error:", errors)
        })
    };

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

import React from 'react'
import { IProductImage } from '@resources/interfaces/IProductImage';
import { Card, CardBody } from 'react-bootstrap'
import { getImage } from '../../../hooks/useProductService';

interface productCardProps {
    image: IProductImage,
    price: number,
    name: string,
    classCard?: string
}


// ajustar a peticion de axios
export const ProductCard = ({ image, price, name, classCard }: productCardProps) => {
    let { nombre_archivo } = image;
    return (
        <div className={`${classCard ? classCard : 'col-lg-3 col-md-4 col-12 col-sm-6 col-xl-2 pt-1'}`}>
            <Card className='rounded-0 pb-1'>
                {/* {image && <Card.Img className='rounded-0' src={`${url}files/${nombre_archivo}`} ></Card.Img>} */}
                <CardBody className=''>
                    <p className="card-text text-secondary">{name}</p>
                    <b> ${price}</b>
                </CardBody>
            </Card>
        </div>
    )
}
